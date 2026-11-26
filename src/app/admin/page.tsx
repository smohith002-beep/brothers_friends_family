import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatDateTime } from "@/lib/utils";
import {
  Users,
  UserCheck,
  FolderKanban,
  Calendar,
  Mail,
  Handshake,
  ShieldCheck,
  History,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export const revalidate = 0;

export default async function AdminOverviewPage() {
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
    pendingRequestsList,
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
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.membershipRequest.findMany({
      where: { status: "PENDING" },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const kpis = [
    { label: "Total Members", val: totalMembers, sub: `${activeMembers} Active`, icon: Users, color: "text-blue-400 bg-blue-500/10", href: "/admin/users" },
    { label: "Pending Approvals", val: pendingApprovals, sub: "Action Required", icon: UserCheck, color: "text-amber-400 bg-amber-500/10", href: "/admin/approvals" },
    { label: "Active Projects", val: activeProjects, sub: `${totalProjects} Total`, icon: FolderKanban, color: "text-cyan-400 bg-cyan-500/10", href: "/admin/projects" },
    { label: "Upcoming Events", val: upcomingEvents, sub: "Scheduled", icon: Calendar, color: "text-purple-400 bg-purple-500/10", href: "/admin/events" },
    { label: "New Enquiries", val: contactEnquiries, sub: "Unprocessed", icon: Mail, color: "text-emerald-400 bg-emerald-500/10", href: "/admin/enquiries" },
    { label: "Partnership Requests", val: partnershipRequests, sub: "Deal Pipeline", icon: Handshake, color: "text-pink-400 bg-pink-500/10", href: "/admin/partnerships" },
  ];

  return (
    <div className="space-y-8">
      {/* Executive Command Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-amber-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            ROOT ADMINISTRATIVE COMMAND CENTER
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ecosystem Executive Analytics & Governance
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/approvals"
            className="px-4 py-2 rounded-xl text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/40 transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Review Applications ({pendingApprovals})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <Link
              key={i}
              href={k.href}
              className="p-5 rounded-2xl bg-[#080D1E] border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">{k.label}</span>
                <div className={`p-1.5 rounded-lg ${k.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="pt-3">
                <div className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {k.val}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{k.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Urgent Queues & Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Urgent Actions: Pending Approvals Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">Pending Member Admissions</h2>
              </div>
              <Link href="/admin/approvals" className="text-xs font-bold text-amber-400 hover:underline">
                View All ({pendingApprovals})
              </Link>
            </div>

            {pendingRequestsList.length > 0 ? (
              <div className="space-y-3">
                {pendingRequestsList.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">{req.fullName}</div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                        {req.primaryPillar}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{req.email}</div>
                    <p className="text-[11px] text-slate-300 line-clamp-2 italic">
                      "{req.statementOfPurpose}"
                    </p>
                    <div className="pt-2 flex justify-end">
                      <Link
                        href="/admin/approvals"
                        className="text-xs font-bold text-amber-400 hover:underline"
                      >
                        Review & Decide →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                All membership requests have been reviewed and decided.
              </p>
            )}
          </div>
        </div>

        {/* Real-Time Immutable Audit Stream (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Security & Administrative Audit Ledger</h2>
              </div>
              <Link href="/admin/audit-logs" className="text-xs font-bold text-cyan-400 hover:underline">
                Full Log Archive
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="pb-2.5">Action</th>
                    <th className="pb-2.5">Module</th>
                    <th className="pb-2.5">Actor</th>
                    <th className="pb-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {recentAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 text-cyan-400 font-bold">{log.action}</td>
                      <td className="py-2.5 text-slate-400">{log.module}</td>
                      <td className="py-2.5 text-slate-300 truncate max-w-[140px]">
                        {log.userEmail || "System"}
                      </td>
                      <td className="py-2.5 text-slate-500">{formatDateTime(log.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

