"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink
} from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  pillar: string;
  readTime: string;
  isPublished: boolean;
  createdAt: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
}

export function AdminBlogManager({ initialPosts }: { initialPosts: PostItem[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    pillar: "MINDSET",
    coverImage: "",
    tags: "",
    readTime: "5 min read",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
        setModalOpen(false);
        setForm({
          title: "",
          excerpt: "",
          content: "",
          pillar: "MINDSET",
          coverImage: "",
          tags: "",
          readTime: "5 min read",
        });
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this article permanently?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${postId}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== postId));
        setFeedback("Article successfully deleted.");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs text-slate-400 font-mono">
          Published Dispatches: {posts.length}
        </span>

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Author & Publish New Article</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Posts Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Pillar</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs truncate">{p.title}</td>
                  <td className="p-4 text-cyan-400">{p.pillar}</td>
                  <td className="p-4 text-slate-400">{p.category?.name || "General"}</td>
                  <td className="p-4 text-slate-300">{p.author.name}</td>
                  <td className="p-4 text-slate-400 font-mono">{formatDate(p.createdAt)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      type="button"
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 border border-rose-500/30 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authoring Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0A1128] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Author Ecosystem Dispatch</h3>
                <p className="text-xs text-slate-400 mt-0.5">Publish insights to the public Intelligence blog.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Headline</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Cognitive Architecture of Enduring Ventures"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Leadership, Cloud, AI"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Key takeaway and thesis statement..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Article Body</label>
                <textarea
                  rows={8}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Draft your complete briefing here..."
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
                  {submitting ? "Publishing Dispatch..." : "Publish Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

