import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [discussions, comments] = await Promise.all([
      prisma.discussion.findMany({
        where: { isReported: true },
        include: { author: { select: { id: true, name: true, email: true } } },
      }),
      prisma.discussionComment.findMany({
        where: { isReported: true },
        include: {
          author: { select: { id: true, name: true, email: true } },
          discussion: { select: { id: true, title: true } },
        },
      }),
    ]);

    return NextResponse.json({ reportedDiscussions: discussions, reportedComments: comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch moderation queue" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { type, id, action } = await request.json(); // action: "DISMISS" | "DELETE"

    if (action === "DISMISS") {
      if (type === "DISCUSSION") {
        await prisma.discussion.update({ where: { id }, data: { isReported: false } });
      } else {
        await prisma.discussionComment.update({ where: { id }, data: { isReported: false } });
      }
    } else if (action === "DELETE") {
      if (type === "DISCUSSION") {
        await prisma.discussion.delete({ where: { id } });
      } else {
        await prisma.discussionComment.delete({ where: { id } });
      }
    }

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: `MODERATION_${action}`,
        module: "COMMUNITY",
        recordId: id,
        details: `Moderator processed ${type} ${id} with action: ${action}`,
      },
    });

    return NextResponse.json({ success: true, message: `Moderation action completed (${action})` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply moderation action" }, { status: 500 });
  }
}

