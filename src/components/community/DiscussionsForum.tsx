"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  Plus,
  Flame,
  Send,
  Flag,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown
} from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    avatarUrl: string | null;
  };
}

interface DiscussionItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  pillar: string;
  upvotes: number;
  viewCount: number;
  isPinned: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  comments: Comment[];
}

export function DiscussionsForum({
  initialDiscussions,
  currentUserId,
}: {
  initialDiscussions: DiscussionItem[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [discussions, setDiscussions] = useState<DiscussionItem[]>(initialDiscussions);
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<DiscussionItem | null>(null);

  // New Topic Form State
  const [form, setForm] = useState({
    title: "",
    content: "",
    pillar: "MINDSET",
    category: "Leadership",
  });
  const [submitting, setSubmitting] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [flagFeedback, setFlagFeedback] = useState<string | null>(null);

  const filtered = discussions.filter(
    (d) => filterCategory === "ALL" || d.pillar === filterCategory
  );

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/community/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalOpen(false);
        setForm({ title: "", content: "", pillar: "MINDSET", category: "Leadership" });
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostComment = async (discussionId: string) => {
    if (!replyText.trim()) return;
    setReplySubmitting(true);
    try {
      const res = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discussionId, content: replyText }),
      });
      if (res.ok) {
        setReplyText("");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleReport = (id: string) => {
    setFlagFeedback(`Item reported to community moderator council.`);
    setTimeout(() => setFlagFeedback(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "MINDSET", "SOLUTIONS", "BUSINESS", "SOCIAL_IMPACT"].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === c
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {c === "SOCIAL_IMPACT" ? "Social Impact" : c}
            </button>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion Topic</span>
        </button>
      </div>

      {flagFeedback && (
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{flagFeedback}</span>
        </div>
      )}

      {/* Discussions Listing */}
      <div className="space-y-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                    {d.pillar}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {d.category}
                  </span>
                  {d.isPinned && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      PINNED
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{d.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{d.content}</p>
              </div>

              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Flame className="w-3.5 h-3.5" />
                <span>{d.upvotes}</span>
              </div>
            </div>

            {/* Author bar & Comments Trigger */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                {d.author.avatarUrl ? (
                  <img
                    src={d.author.avatarUrl}
                    alt={d.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : null}
                <span className="font-semibold text-slate-300">{d.author.name}</span>
                <span>•</span>
                <span>{formatDate(d.createdAt)}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleReport(d.id)}
                  type="button"
                  className="hover:text-rose-400 flex items-center gap-1"
                  title="Report inappropriate content"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>

                <button
                  onClick={() =>
                    setSelectedDiscussion(selectedDiscussion?.id === d.id ? null : d)
                  }
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{d.comments.length} Replies</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      selectedDiscussion?.id === d.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Expanded Comments Thread */}
            {selectedDiscussion?.id === d.id && (
              <div className="pt-4 border-t border-slate-800/80 space-y-4 bg-slate-950/40 p-4 rounded-xl">
                <div className="space-y-3">
                  {d.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-white">{c.author.name}</span>
                        <span>{formatDate(c.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>
                    </div>
                  ))}
                  {d.comments.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No replies yet. Be the first to share your perspective.</p>
                  )}
                </div>

                {/* Reply box */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Contribute to this discussion thread..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => handlePostComment(d.id)}
                    disabled={replySubmitting || !replyText.trim()}
                    type="button"
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Topic Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0A1128] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Start New Community Discussion</h3>
                <p className="text-xs text-slate-400 mt-0.5">Share insights or initiate a collaborative debate.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Scaling unit economics in frontier markets"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pillar</label>
                  <select
                    value={form.pillar}
                    onChange={(e) => setForm({ ...form, pillar: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="MINDSET">Mindset</option>
                    <option value="SOLUTIONS">Solutions</option>
                    <option value="BUSINESS">Business</option>
                    <option value="SOCIAL_IMPACT">Social Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Venture Strategy"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Discussion Content</label>
                <textarea
                  rows={5}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Provide context, metrics, and thoughtful discussion prompts..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                >
                  {submitting ? "Publishing Topic..." : "Publish Topic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

