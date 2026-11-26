import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      occupation,
      organization,
      primaryPillar,
      statementOfPurpose,
      linkedinUrl,
    } = await request.json();

    if (!fullName || !email || !statementOfPurpose) {
      return NextResponse.json(
        { error: "Full Name, email, and statement of purpose are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if duplicate request exists
    const existing = await prisma.membershipRequest.findFirst({
      where: { email: normalizedEmail, status: "PENDING" },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A pending membership application already exists for this email address" },
        { status: 409 }
      );
    }

    const requestRecord = await prisma.membershipRequest.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
        occupation: occupation?.trim() || null,
        organization: organization?.trim() || null,
        primaryPillar: primaryPillar || "MINDSET",
        statementOfPurpose: statementOfPurpose.trim(),
        linkedinUrl: linkedinUrl?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Membership application successfully submitted for administrative council review.",
      id: requestRecord.id,
    });
  } catch (error: any) {
    console.error("Membership application error:", error);
    return NextResponse.json(
      { error: "Failed to submit membership application" },
      { status: 500 }
    );
  }
}

