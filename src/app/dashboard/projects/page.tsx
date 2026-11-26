import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { FolderGit2, Plus, CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function MemberProjectsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: user.id },
        { members: { some: { userId: user.id } } },
      ],
    },
    include: {
      milestones: {
        include: { tasks: true },
        orderBy: { order: "asc" },
      },
      members: {
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects & Collaboration Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track development milestones, assign tasks, and monitor deployment velocity.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Propose New Project</span>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                      {project.pillar}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {project.status.replace("_", " ")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{project.summary}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400">Milestone Progress</span>
                  <div className="text-xl font-bold text-cyan-400 font-mono">
                    {project.progressPercentage}%
                  </div>
                </div>
              </div>

              {/* Milestones and Tasks */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phases & Milestone Deliverables
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.milestones.map((ms) => (
                    <div
                      key={ms.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{ms.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ms.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {ms.status}
                        </span>
                      </div>

                      {ms.description && (
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {ms.description}
                        </p>
                      )}

                      {/* Tasks under milestone */}
                      {ms.tasks && ms.tasks.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                          {ms.tasks.map((t) => (
                            <div
                              key={t.id}
                              className="flex items-center justify-between text-xs text-slate-300"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2
                                  className={`w-3.5 h-3.5 ${
                                    t.status === "DONE" ? "text-emerald-400" : "text-slate-600"
                                  }`}
                                />
                                <span>{t.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 uppercase">{t.priority}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Collaborators:</span>
                  <div className="flex -space-x-2">
                    {project.members.map((m) => (
                      <img
                        key={m.id}
                        src={
                          m.user.avatarUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                        }
                        alt={m.user.name}
                        title={m.user.name}
                        className="w-6 h-6 rounded-full border border-slate-900 object-cover"
                      />
                    ))}
                  </div>
                </div>

                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline font-medium"
                  >
                    Open Source Code Repo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Assigned Projects Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You have not joined or submitted any projects yet. Discover active initiatives in our collaborative catalog or submit your own proposal.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            <span>Explore Public Project Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

