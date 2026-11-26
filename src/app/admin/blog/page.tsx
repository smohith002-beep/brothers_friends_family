import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminBlogManager } from "@/components/admin/AdminBlogManager";
import { FileText } from "lucide-react";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <FileText className="w-4 h-4" />
          <span>EDITORIAL & INTELLECTUAL CAPITAL</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Content & Intelligence Management</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Author strategic briefings, publish research papers, and manage public ecosystem articles.
        </p>
      </div>

      <AdminBlogManager initialPosts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}

