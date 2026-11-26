import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to register for events" },
        { status: 401 }
      );
    }

    const { eventId, notes } = await request.json();
    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if user already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 409 }
      );
    }

    // Check capacity
    if (event.registeredCount >= event.capacity) {
      return NextResponse.json(
        { error: "This event has reached full capacity" },
        { status: 400 }
      );
    }

    // Create registration & increment count in a transaction
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          eventId,
          userId: user.id,
          status: "CONFIRMED",
          notes: notes?.trim() || null,
        },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: { registeredCount: { increment: 1 } },
      }),
      prisma.notification.create({
        data: {
          userId: user.id,
          title: "Event Registration Confirmed",
          message: `You are confirmed for '${event.title}'. Access details and calendar invites are available in your dashboard.`,
          type: "SUCCESS",
          link: "/dashboard/events",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Successfully registered for ${event.title}!`,
      registration,
    });
  } catch (error: any) {
    console.error("Event registration error:", error);
    return NextResponse.json(
      { error: "Failed to complete event registration" },
      { status: 500 }
    );
  }
}

