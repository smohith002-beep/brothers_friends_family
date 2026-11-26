import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required to enroll" }, { status: 401 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const course = await prisma.academyCourse.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check existing enrollment
    const existing = await prisma.academyEnrollment.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId: user.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        message: "You are already enrolled in this curriculum.",
        enrollment: existing,
      });
    }

    // Create new enrollment
    const enrollment = await prisma.academyEnrollment.create({
      data: {
        courseId,
        userId: user.id,
        progressPercentage: 10,
        status: "IN_PROGRESS",
      },
    });

    // Notify user
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Academy Enrollment Confirmed",
        message: `You have successfully enrolled in ${course.title}. Access your study materials and modules from your dashboard.`,
        type: "ACADEMY",
        link: "/dashboard/academy",
      },
    });

    return NextResponse.json({
      message: "Enrolled successfully!",
      enrollment,
    });
  } catch (error: any) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "Failed to process enrollment" },
      { status: 500 }
    );
  }
}
