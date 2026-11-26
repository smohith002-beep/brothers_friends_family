import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message, pillarInterest } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || "General Inquiry",
        message: message.trim(),
        pillarInterest: pillarInterest || "ALL",
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received by BFF Executive Operations. Our team will review and respond promptly.",
      enquiryId: enquiry.id,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch contact inquiry. Please try again." },
      { status: 500 }
    );
  }
}

