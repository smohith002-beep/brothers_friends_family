import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Mail, Clock, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.contactEnquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <Mail className="w-4 h-4" />
          <span>INCOMING DISPATCH REGISTRY</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Contact & Public Enquiries</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review messages transmitted through the public contact center.
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div
            key={enq.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-bold text-white">{enq.subject}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                    {enq.pillarInterest}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {enq.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  From: <strong className="text-slate-200">{enq.name}</strong> • {enq.email} {enq.phone && `• ${enq.phone}`}
                </div>
              </div>

              <span className="text-xs text-slate-500 font-mono">
                {formatDate(enq.createdAt)}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              {enq.message}
            </p>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 text-xs text-slate-400">
            No contact enquiries in the mailbox.
          </div>
        )}
      </div>
    </div>
  );
}

