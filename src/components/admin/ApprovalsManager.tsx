"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  UserCheck,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

interface RequestItem {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  occupation: string | null;
  organization: string | null;
  primaryPillar: string;
  statementOfPurpose: string;
  linkedinUrl: string | null;
  status: string;
  createdAt: string;
}

export function ApprovalsManager({ initialRequests }: { initialRequests: RequestItem[] }) {
  const router = useRouter();
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleDecision = async (requestId: string, action: "APPROVE" | "REJECT") => {
    const confirmed = window.confirm(
      `Are you sure you want to ${action === "APPROVE" ? "APPROVE and activate" : "REJECT"} this membership application?`
    );
    if (!confirmed) return;

    setProcessingId(requestId);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          action,
          adminNotes: `Decision processed via executive console by admin`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", msg: data.error || "Decision processing failed" });
      } else {
        setFeedback({ type: "success", msg: data.message });
        setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: action === "APPROVE" ? "APPROVED" : "REJECTED" } : r)));
        router.refresh();
      }
    } catch (err) {
      setFeedback({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white">{req.fullName}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                    {req.primaryPillar}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : req.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {req.email} {req.phone && `• ${req.phone}`}
                </div>
              </div>

              <span className="text-xs text-slate-500 font-mono">
                Submitted {formatDate(req.createdAt)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block mb-0.5">Role & Organization:</span>
                <span className="font-medium text-white">
                  {req.occupation || "N/A"} {req.organization && `at ${req.organization}`}
                </span>
              </div>
              {req.linkedinUrl && (
                <div>
                  <span className="text-slate-500 block mb-0.5">Verified Profile:</span>
                  <a
                    href={req.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>{req.linkedinUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-slate-500 font-bold block">Statement of Purpose:</span>
              <p className="italic leading-relaxed">"{req.statementOfPurpose}"</p>
            </div>

            {/* Action buttons (only if PENDING) */}
            {req.status === "PENDING" && (
              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => handleDecision(req.id, "REJECT")}
                  disabled={processingId === req.id}
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 border border-rose-500/30 transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Decline Application</span>
                </button>

                <button
                  onClick={() => handleDecision(req.id, "APPROVE")}
                  disabled={processingId === req.id}
                  type="button"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve & Provision Account</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 text-xs text-slate-400">
            No pending or reviewed membership applications found.
          </div>
        )}
      </div>
    </div>
  );
}

