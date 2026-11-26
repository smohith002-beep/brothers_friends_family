import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { title, excerpt, content, coverImage, pillar, categoryId, tags, readTime } = await request.json();

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, excerpt, and content are required" },
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

    // Get default category if not provided
    let catId = categoryId;
    if (!catId) {
      const firstCat = await prisma.blogCategory.findFirst();
      catId = firstCat?.id;
    }

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
        pillar: pillar || "MINDSET",
        categoryId: catId,
        authorId: user.id,
        tags: tags || "Ecosystem, Insights",
        readTime: readTime || "5 min read",
        isPublished: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "BLOG_POST_PUBLISHED",
        module: "CONTENT",
        recordId: post.id,
        details: `Published blog post: ${post.title}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Article '${post.title}' published successfully!`,
      post,
    });
  } catch (error: any) {
    console.error("Blog post error:", error);
    return NextResponse.json({ error: "Failed to publish article" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    await prisma.blogPost.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "BLOG_POST_DELETED",
        module: "CONTENT",
        recordId: id,
        details: `Deleted article ${id}`,
      },
    });

    return NextResponse.json({ success: true, message: "Article removed" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}

