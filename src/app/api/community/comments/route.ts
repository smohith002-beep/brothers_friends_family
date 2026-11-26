import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { discussionId, content } = await request.json();

    if (!discussionId || !content) {
      return NextResponse.json(
        { error: "Discussion ID and comment content are required" },
        { status: 400 }
      );
    }

    const comment = await prisma.discussionComment.create({
      data: {
        discussionId,
        authorId: user.id,
        content: content.trim(),
      },
      include: {
        author: {
          select: { id: true, name: true, avatarUrl: true, role: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Comment posted",
      comment,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}

