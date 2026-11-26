import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Handshake, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminPartnershipsPage() {
  const requests = await prisma.partnershipRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <Handshake className="w-4 h-4" />
          <span>INSTITUTIONAL ALLIANCE PIPELINE</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Strategic Partnership Requests</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review corporate sponsor applications, enterprise technology proposals, and academic alliances.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-bold text-white">{req.organizationName}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                    {req.partnershipType.replace("_", " ")}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Lead Contact: <strong className="text-slate-200">{req.contactName}</strong> • {req.email} {req.phone && `• ${req.phone}`}
                </div>
              </div>

              <span className="text-xs text-slate-500 font-mono">
                Received {formatDate(req.createdAt)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-slate-500 font-bold block">Collaboration Scope:</span>
              <p className="leading-relaxed whitespace-pre-line">{req.proposalDetails}</p>
            </div>

            {req.website && (
              <div className="pt-2 text-xs">
                <a
                  href={req.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Visit {req.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 text-xs text-slate-400">
            No partnership proposals currently on record.
          </div>
        )}
      </div>
    </div>
  );
}

