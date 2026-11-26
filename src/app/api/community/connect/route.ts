import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId, message } = await request.json();

    if (!targetUserId) {
      return NextResponse.json({ error: "Target user ID is required" }, { status: 400 });
    }

    if (targetUserId === user.id) {
      return NextResponse.json({ error: "Cannot connect with yourself" }, { status: 400 });
    }

    // Check existing request
    const existingReq = await prisma.connectionRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: user.id,
          receiverId: targetUserId,
        },
      },
    });

    if (existingReq) {
      return NextResponse.json({
        success: true,
        message: "Connection request already pending",
      });
    }

    const connReq = await prisma.connectionRequest.create({
      data: {
        senderId: user.id,
        receiverId: targetUserId,
        message: message?.trim() || null,
        status: "PENDING",
      },
    });

    // Create notification for target user
    await prisma.notification.create({
      data: {
        userId: targetUserId,
        title: "New Connection Request",
        message: `${user.name} sent you a connection request.`,
        type: "INFO",
        link: "/dashboard/community/members",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Connection invitation transmitted successfully",
      request: connReq,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to transmit connection request" },
      { status: 500 }
    );
  }
}

