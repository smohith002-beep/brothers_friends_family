import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Access Denied: Admin Privileges Required" }, { status: 403 });
    }

    const [
      totalMembers,
      activeMembers,
      pendingApprovals,
      totalProjects,
      activeProjects,
      upcomingEvents,
      contactEnquiries,
      partnershipRequests,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.membershipRequest.count({ where: { status: "PENDING" } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: { in: ["APPROVED", "IN_PROGRESS"] } } }),
      prisma.event.count({ where: { status: "UPCOMING" } }),
      prisma.contactEnquiry.count({ where: { status: "NEW" } }),
      prisma.partnershipRequest.count({ where: { status: "NEW" } }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalMembers,
        activeMembers,
        pendingApprovals,
        totalProjects,
        activeProjects,
        upcomingEvents,
        contactEnquiries,
        partnershipRequests,
      },
      recentAuditLogs,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load administrative analytics" }, { status: 500 });
  }
}

