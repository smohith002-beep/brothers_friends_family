import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      organizationName,
      contactName,
      email,
      phone,
      website,
      partnershipType,
      proposalDetails,
    } = await request.json();

    if (!organizationName || !contactName || !email || !proposalDetails) {
      return NextResponse.json(
        { error: "Organization name, contact person, email, and proposal details are required" },
        { status: 400 }
      );
    }

    const partnerReq = await prisma.partnershipRequest.create({
      data: {
        organizationName: organizationName.trim(),
        contactName: contactName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        website: website?.trim() || null,
        partnershipType: partnershipType || "CORPORATE_SPONSOR",
        proposalDetails: proposalDetails.trim(),
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Partnership proposal submitted successfully to the BFF Business Council.",
      id: partnerReq.id,
    });
  } catch (error: any) {
    console.error("Partnership API error:", error);
    return NextResponse.json(
      { error: "Failed to submit partnership request" },
      { status: 500 }
    );
  }
}

