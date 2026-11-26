import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pillar = searchParams.get("pillar");
    const category = searchParams.get("category");

    const where: any = {};
    if (pillar && pillar !== "ALL") where.pillar = pillar;
    if (category && category !== "ALL") where.category = category;

    const discussions = await prisma.discussion.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, avatarUrl: true, role: true },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ discussions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch discussions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, pillar, category } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(Math.random() * 1000);

    const discussion = await prisma.discussion.create({
      data: {
        title: title.trim(),
        slug,
        content: content.trim(),
        pillar: pillar || "MINDSET",
        category: category || "General",
        authorId: user.id,
      },
      include: {
        author: {
          select: { id: true, name: true, avatarUrl: true, role: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Discussion topic published to the BFF Community",
      discussion,
    });
  } catch (error: any) {
    console.error("Discussion creation error:", error);
    return NextResponse.json(
      { error: "Failed to publish discussion" },
      { status: 500 }
    );
  }
}

