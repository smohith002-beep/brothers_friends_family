import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    let body: { opportunityId?: unknown; pitchMessage?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    const opportunityId =
      typeof body.opportunityId === "string" ? body.opportunityId.trim() : "";
    const pitchMessage =
      typeof body.pitchMessage === "string" ? body.pitchMessage.trim() : "";

    if (!opportunityId || pitchMessage.length < 10 || pitchMessage.length > 5000) {
      return NextResponse.json(
        { error: "An opportunity and a pitch between 10 and 5000 characters are required" },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      select: { id: true, status: true, deadline: true },
    });

    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    if (
      opportunity.status !== "OPEN" ||
      (opportunity.deadline && opportunity.deadline <= new Date())
    ) {
      return NextResponse.json({ error: "This opportunity is no longer accepting applications" }, { status: 409 });
    }

    const application = await prisma.opportunityApplication.create({
      data: {
        opportunityId: opportunity.id,
        userId: user.id,
        pitchMessage,
      },
      select: { id: true, status: true, appliedAt: true },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "You have already applied to this opportunity" },
        { status: 409 }
      );
    }

    console.error("Opportunity application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
