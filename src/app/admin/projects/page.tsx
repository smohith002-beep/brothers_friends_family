import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminProjectsManager } from "@/components/admin/AdminProjectsManager";
import { FolderKanban } from "lucide-react";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      owner: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <FolderKanban className="w-4 h-4" />
          <span>PROJECT WORKFLOW & STAGE CONTROL</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Project Approvals & Oversight</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review member proposals, transition project statuses, and feature flagship initiatives.
        </p>
      </div>

      <AdminProjectsManager initialProjects={JSON.parse(JSON.stringify(projects))} />
    </div>
  );
}

