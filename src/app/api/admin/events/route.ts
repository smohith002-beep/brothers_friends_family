import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const {
      title,
      description,
      pillar,
      category,
      bannerUrl,
      locationType,
      venue,
      meetingLink,
      startDate,
      endDate,
      capacity,
    } = await request.json();

    if (!title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Title, description, start date, and end date are required" },
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

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        slug,
        description: description.trim(),
        pillar: pillar || "MINDSET",
        category: category || "Workshop",
        bannerUrl: bannerUrl?.trim() || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
        locationType: locationType || "ONLINE",
        venue: venue?.trim() || null,
        meetingLink: meetingLink?.trim() || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        capacity: Number(capacity) || 100,
        status: "UPCOMING",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "EVENT_CREATED",
        module: "EVENTS",
        recordId: event.id,
        details: `Created new event: ${event.title}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Event '${event.title}' scheduled and published successfully`,
      event,
    });
  } catch (error: any) {
    console.error("Admin event creation error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

