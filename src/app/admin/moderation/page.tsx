import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { MessageSquareWarning, ShieldCheck, Trash2, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminModerationPage() {
  const [reportedDiscussions, reportedComments] = await Promise.all([
    prisma.discussion.findMany({
      where: { isReported: true },
      include: { author: { select: { name: true, email: true } } },
    }),
    prisma.discussionComment.findMany({
      where: { isReported: true },
      include: {
        author: { select: { name: true, email: true } },
        discussion: { select: { title: true } },
      },
    }),
  ]);

  const totalFlagged = reportedDiscussions.length + reportedComments.length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <MessageSquareWarning className="w-4 h-4" />
          <span>COMMUNITY STANDARDS & INTEGRITY</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Community Moderation Queue</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review reported discussions and comments. Maintain a safe, high-trust environment.
        </p>
      </div>

      {totalFlagged === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 text-xs text-slate-400 space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Moderation Queue Clear</h3>
          <p className="max-w-md mx-auto">
            Zero reported forum topics or member comments pending administrative review.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reportedDiscussions.map((d) => (
            <div key={d.id} className="glass-card rounded-2xl p-6 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  FLAGGED TOPIC
                </span>
                <span className="text-xs text-slate-400">{formatDate(d.createdAt)}</span>
              </div>
              <h3 className="text-base font-bold text-white">{d.title}</h3>
              <p className="text-xs text-slate-300 italic">"{d.content}"</p>
              <div className="pt-2 text-xs text-slate-400">
                Author: <strong className="text-white">{d.author.name}</strong> ({d.author.email})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

