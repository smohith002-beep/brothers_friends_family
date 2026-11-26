import React from "react";
import { prisma } from "@/lib/prisma";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";
import { Cpu } from "lucide-react";

export const metadata = {
  title: "Collaborative Projects & Portfolio | Brothers_Friends_Families (BFF)",
  description: "Explore sovereign open-source engineering, venture prototypes, and social impact initiatives built inside the BFF ecosystem.",
};

export const revalidate = 30;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      owner: { select: { name: true, avatarUrl: true } },
      milestones: { select: { id: true, title: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Cpu className="w-3.5 h-3.5" />
          Collaborative Engineering
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Sovereign Projects Portfolio
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Discover verified engineering initiatives, venture builds, and humanitarian installations engineered by members across the 4 Pillars.
        </p>
      </div>

      <ProjectsDirectory initialProjects={projects as any} />
    </div>
  );
}

