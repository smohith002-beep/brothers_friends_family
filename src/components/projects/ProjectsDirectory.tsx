"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  Cpu,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Github,
  X,
  AlertCircle
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  pillar: string;
  category: string;
  status: string;
  budget: string | null;
  progressPercentage: number;
  repositoryUrl: string | null;
  liveUrl: string | null;
  owner: {
    name: string;
    avatarUrl: string | null;
  };
  milestones: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}

export function ProjectsDirectory({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filterPillar, setFilterPillar] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  // Proposal Form State
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    pillar: "SOLUTIONS",
    category: "Software Architecture",
    budget: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const filtered = projects.filter((p) => {
    const matchPillar = filterPillar === "ALL" || p.pillar.toUpperCase() === filterPillar.toUpperCase();
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchPillar && matchSearch;
  });

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login?redirect=/projects");
      return;
    }

    setSubmitting(true);
    setFormError("");
    setFormSuccess("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to submit proposal");
      } else {
        setFormSuccess("Project proposal submitted successfully for administrative review!");
        setForm({
          title: "",
          summary: "",
          description: "",
          pillar: "SOLUTIONS",
          category: "Software Architecture",
          budget: "",
        });
        setTimeout(() => {
          setModalOpen(false);
          setFormSuccess("");
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, category, or summary..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["ALL", "MINDSET", "SOLUTIONS", "BUSINESS", "SOCIAL_IMPACT"].map((pil) => (
            <button
              key={pil}
              onClick={() => setFilterPillar(pil)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterPillar === pil
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {pil === "SOCIAL_IMPACT" ? "Social Impact" : pil}
            </button>
          ))}
        </div>

        {/* Submit Proposal CTA */}
        <button
          onClick={() => {
            if (!user) {
              router.push("/login?redirect=/projects");
            } else {
              setModalOpen(true);
            }
          }}
          type="button"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Propose Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                  {p.pillar}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {p.status.replace("_", " ")}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>
                <span className="text-xs text-slate-400 font-medium">{p.category}</span>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] font-medium text-slate-400">
                  <span>Milestone Completion</span>
                  <span className="text-cyan-400 font-bold">{p.progressPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${p.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Milestones list snippet */}
              {p.milestones && p.milestones.length > 0 && (
                <div className="space-y-1 pt-1">
                  {p.milestones.slice(0, 2).map((m) => (
                    <div key={m.id} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <CheckCircle2
                        className={`w-3 h-3 ${
                          m.status === "COMPLETED" ? "text-emerald-400" : "text-slate-600"
                        }`}
                      />
                      <span className="truncate">{m.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {p.owner.avatarUrl && (
                  <img
                    src={p.owner.avatarUrl}
                    alt={p.owner.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-slate-400 truncate max-w-[110px]">{p.owner.name}</span>
              </div>

              <div className="flex items-center gap-3">
                {p.repositoryUrl && (
                  <a
                    href={p.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                    title="Live Platform"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">No projects found matching the selected filter criteria.</p>
        </div>
      )}

      {/* Propose Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#0A1128] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Submit Project Proposal</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Propose a new collaborative project for administrative review and team allocation.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePropose} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Autonomous LoRaWAN Water Telemetry Grid"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Pillar</label>
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
                    placeholder="e.g. Distributed Infrastructure"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Summary (Short)</label>
                <input
                  type="text"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="One or two sentences describing the problem and target impact..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Technical & Strategic Description</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Elaborate on the architecture, target milestones, required skillsets, and community beneficiaries..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Budget / Capital Need (Optional)</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="e.g. $45,000 USD or Pro Bono / Open Source"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
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
                  {submitting ? "Submitting Proposal..." : "Submit Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

