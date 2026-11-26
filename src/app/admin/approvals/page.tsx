import React from "react";
import { prisma } from "@/lib/prisma";
import { ApprovalsManager } from "@/components/admin/ApprovalsManager";
import { UserCheck } from "lucide-react";

export const revalidate = 0;

export default async function AdminApprovalsPage() {
  const requests = await prisma.membershipRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <UserCheck className="w-4 h-4" />
          <span>MEMBERSHIP ADMISSIONS WORKFLOW</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Review & Approve Membership Candidates</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Evaluate applications, verify candidate purpose, and auto-provision active ecosystem accounts.
        </p>
      </div>

      <ApprovalsManager initialRequests={JSON.parse(JSON.stringify(requests))} />
    </div>
  );
}

