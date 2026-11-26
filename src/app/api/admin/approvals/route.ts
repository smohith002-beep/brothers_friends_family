import { NextResponse } from "next/server";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const requests = await prisma.membershipRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch membership requests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { requestId, action, adminNotes } = await request.json(); // action: "APPROVE" | "REJECT"

    if (!requestId || !action) {
      return NextResponse.json({ error: "Request ID and action are required" }, { status: 400 });
    }

    const membershipReq = await prisma.membershipRequest.findUnique({
      where: { id: requestId },
    });

    if (!membershipReq) {
      return NextResponse.json({ error: "Membership application not found" }, { status: 404 });
    }

    if (action === "APPROVE") {
      // Check if user already exists
      let existingUser = await prisma.user.findUnique({
        where: { email: membershipReq.email },
      });

      if (!existingUser) {
        // Auto-provision user account with default credentials
        const tempPassword = "Member@BFF2026!";
        const passwordHash = await hashPassword(tempPassword);

        existingUser = await prisma.user.create({
          data: {
            name: membershipReq.fullName,
            email: membershipReq.email,
            passwordHash,
            role: "MEMBER",
            status: "ACTIVE",
            isVerified: true,
            avatarUrl: `https://avatar.vercel.sh/${encodeURIComponent(membershipReq.email)}.png`,
            profile: {
              create: {
                headline: membershipReq.occupation || "Verified BFF Member",
                company: membershipReq.organization || undefined,
                pillarFocus: membershipReq.primaryPillar,
                membershipTier: "STANDARD",
                completionRate: 70,
                bio: membershipReq.statementOfPurpose,
                linkedin: membershipReq.linkedinUrl || undefined,
              },
            },
          },
        });
      }

      await prisma.membershipRequest.update({
        where: { id: requestId },
        data: {
          status: "APPROVED",
          adminNotes: adminNotes || "Approved by executive review",
          reviewedAt: new Date(),
          reviewedBy: currentUser.email,
        },
      });

      // Audit log
      await prisma.auditLog.create({
        data: {
          userId: currentUser.id,
          userEmail: currentUser.email,
          action: "MEMBERSHIP_APPROVED",
          module: "USERS",
          recordId: requestId,
          details: `Approved membership request for ${membershipReq.fullName} (${membershipReq.email})`,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Membership approved for ${membershipReq.fullName}. Account active.`,
      });
    } else {
      await prisma.membershipRequest.update({
        where: { id: requestId },
        data: {
          status: "REJECTED",
          adminNotes: adminNotes || "Does not meet current cohort criteria",
          reviewedAt: new Date(),
          reviewedBy: currentUser.email,
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: currentUser.id,
          userEmail: currentUser.email,
          action: "MEMBERSHIP_REJECTED",
          module: "USERS",
          recordId: requestId,
          details: `Rejected membership application for ${membershipReq.email}: ${adminNotes || "No reason specified"}`,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Application for ${membershipReq.fullName} has been declined.`,
      });
    }
  } catch (error: any) {
    console.error("Admin approval error:", error);
    return NextResponse.json({ error: "Failed to process application decision" }, { status: 500 });
  }
}

