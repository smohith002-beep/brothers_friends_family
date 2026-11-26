import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pillar = searchParams.get("pillar");
    const status = searchParams.get("status");

    const where: any = {};
    if (pillar && pillar !== "ALL") {
      where.pillar = pillar;
    }
    if (status && status !== "ALL") {
      where.status = status;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        owner: {
          select: { id: true, name: true, avatarUrl: true, role: true },
        },
        members: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
        },
        milestones: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      summary,
      description,
      pillar,
      category,
      budget,
      targetDate,
      repositoryUrl,
      liveUrl,
    } = await request.json();

    if (!title || !summary || !description) {
      return NextResponse.json(
        { error: "Title, summary, and description are required" },
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

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug,
        summary: summary.trim(),
        description: description.trim(),
        pillar: pillar || "SOLUTIONS",
        category: category || "Technology",
        status: "SUBMITTED",
        budget: budget || null,
        targetDate: targetDate ? new Date(targetDate) : null,
        repositoryUrl: repositoryUrl?.trim() || null,
        liveUrl: liveUrl?.trim() || null,
        ownerId: user.id,
        progressPercentage: 5,
        members: {
          create: {
            userId: user.id,
            role: "LEAD",
          },
        },
        milestones: {
          create: [
            {
              title: "Project Inception & Architecture",
              description: "Requirements gathering, architectural review, and team allocation",
              status: "IN_PROGRESS",
              order: 1,
            },
            {
              title: "Alpha Milestone",
              description: "First working implementation and stakeholder review",
              status: "PENDING",
              order: 2,
            },
          ],
        },
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "PROJECT_PROPOSED",
        module: "PROJECTS",
        recordId: project.id,
        details: `Project proposal submitted: ${project.title}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project proposal submitted successfully for administrative review.",
      project,
    });
  } catch (error: any) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      { error: "Failed to submit project proposal" },
      { status: 500 }
    );
  }
}

