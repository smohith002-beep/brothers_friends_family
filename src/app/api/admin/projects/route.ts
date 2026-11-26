import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.role !== "PROJECT_MANAGER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { projectId, status, progressPercentage, featured } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        status: status || undefined,
        progressPercentage: progressPercentage !== undefined ? Number(progressPercentage) : undefined,
        featured: featured !== undefined ? Boolean(featured) : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "PROJECT_STATUS_UPDATE",
        module: "PROJECTS",
        recordId: projectId,
        details: `Updated project '${updated.title}' to status: ${status || "same"} (Progress: ${updated.progressPercentage}%)`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Project '${updated.title}' updated successfully`,
      project: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

