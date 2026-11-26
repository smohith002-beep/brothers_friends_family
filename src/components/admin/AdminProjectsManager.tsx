"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Github
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  pillar: string;
  category: string;
  status: string;
  budget: string | null;
  progressPercentage: number;
  featured: boolean;
  createdAt: string;
  owner: {
    name: string;
    email: string;
  };
}

export function AdminProjectsManager({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdate = async (
    projectId: string,
    newStatus?: string,
    progressPercentage?: number,
    featured?: boolean
  ) => {
    setProcessingId(projectId);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, status: newStatus, progressPercentage, featured }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
        setProjects(
          projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  status: newStatus !== undefined ? newStatus : p.status,
                  progressPercentage: progressPercentage !== undefined ? progressPercentage : p.progressPercentage,
                  featured: featured !== undefined ? featured : p.featured,
                }
              : p
          )
        );
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Pillar</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Status Workflow</th>
                <th className="p-4">Progress (%)</th>
                <th className="p-4">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-400">{p.category}</div>
                  </td>

                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                      {p.pillar}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="text-white font-medium">{p.owner.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.owner.email}</div>
                  </td>

                  <td className="p-4">
                    <select
                      value={p.status}
                      onChange={(e) => handleUpdate(p.id, e.target.value, undefined, undefined)}
                      disabled={processingId === p.id}
                      className="px-2 py-1 text-[11px] bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="SUBMITTED">SUBMITTED</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        defaultValue={p.progressPercentage}
                        onBlur={(e) =>
                          handleUpdate(p.id, undefined, Number(e.target.value), undefined)
                        }
                        className="w-16 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded text-center text-cyan-400 font-mono font-bold"
                      />
                      <span>%</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleUpdate(p.id, undefined, undefined, !p.featured)}
                      disabled={processingId === p.id}
                      type="button"
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        p.featured
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {p.featured ? "Featured" : "Standard"}
                    </button>
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

