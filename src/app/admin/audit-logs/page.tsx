import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { History, Shield } from "lucide-react";

export const revalidate = 0;

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <History className="w-4 h-4" />
          <span>SECURITY & COMPLIANCE ARCHIVE</span>
        </div>
        <h1 className="text-2xl font-bold text-white">System Security Audit Ledger</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Immutable, chronological event tracking of administrative actions, account approvals, and security updates.
        </p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">Module</th>
                <th className="p-4">Actor Email</th>
                <th className="p-4">Event Details</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4 text-cyan-400 font-bold">{log.action}</td>
                  <td className="p-4 text-slate-400">{log.module}</td>
                  <td className="p-4 text-slate-300">{log.userEmail || "SYSTEM_DAEMON"}</td>
                  <td className="p-4 text-slate-300 font-sans max-w-sm truncate">
                    {log.details || "N/A"}
                  </td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {formatDateTime(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

