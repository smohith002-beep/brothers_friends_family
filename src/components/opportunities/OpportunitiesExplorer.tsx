"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  Briefcase,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface OpportunityItem {
  id: string;
  title: string;
  slug: string;
  organization: string;
  type: string;
  pillar: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  location: string | null;
  status: string;
  featured: boolean;
  author: {
    name: string;
    avatarUrl: string | null;
  };
}

export function OpportunitiesExplorer({ initialOpportunities }: { initialOpportunities: OpportunityItem[] }) {
  const router = useRouter();
  const { user } = useAuth();
  const [opportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);
  const [pitchMessage, setPitchMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const filtered = opportunities.filter((op) => {
    return filterType === "ALL" || op.type.toUpperCase() === filterType.toUpperCase();
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login?redirect=/opportunities");
      return;
    }

    if (!selectedOpp) return;
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/opportunities/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunityId: selectedOpp.id,
          pitchMessage: pitchMessage.trim(),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit your application.");
      }

      setFeedback({
        type: "success",
        msg: `Your application for '${selectedOpp.title}' has been submitted.`,
      });
      setTimeout(() => {
        setSelectedOpp(null);
        setPitchMessage("");
        setFeedback(null);
      }, 2000);
    } catch (error) {
      setFeedback({
        type: "error",
        msg: error instanceof Error ? error.message : "Failed to submit your application.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        {["ALL", "INVESTMENT", "CO_FOUNDER", "PARTNERSHIP", "MENTORSHIP"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterType === t
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((op) => (
          <div
            key={op.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                  {op.type.replace("_", " ")}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {op.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-cyan-400">{op.organization}</span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mt-0.5">
                  {op.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                  {op.description}
                </p>
              </div>

              {op.requirements && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
                  <strong className="text-slate-300 block mb-0.5">Requirements:</strong>
                  <span className="line-clamp-2">{op.requirements}</span>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{op.location || "Remote / Global"}</span>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    router.push("/login?redirect=/opportunities");
                  } else {
                    setSelectedOpp(op);
                  }
                }}
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Apply / Express Interest
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0A1128] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Express Interest</h3>
                <p className="text-xs text-cyan-400 mt-0.5">{selectedOpp.title} • {selectedOpp.organization}</p>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
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

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brief Pitch / Background Statement
                </label>
                <textarea
                  rows={4}
                  required
                  value={pitchMessage}
                  onChange={(e) => setPitchMessage(e.target.value)}
                  placeholder="Summarize your relevant credentials, syndicate capacity, or technical capabilities..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Your application will be recorded for review by the opportunity lead.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                >
                  {submitting ? "Transmitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

