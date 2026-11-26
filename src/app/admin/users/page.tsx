import React from "react";
import { prisma } from "@/lib/prisma";
import { UsersManager } from "@/components/admin/UsersManager";
import { Users } from "lucide-react";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <Users className="w-4 h-4" />
          <span>ACCESS & ROLE GOVERNANCE (RBAC)</span>
        </div>
        <h1 className="text-2xl font-bold text-white">User & Account Management</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage member permissions, promote roles, and oversee account security statuses.
        </p>
      </div>

      <UsersManager initialUsers={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}

