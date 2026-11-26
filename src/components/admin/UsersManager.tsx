"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Search,
  Shield,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatarUrl: string | null;
  createdAt: string;
  profile: {
    headline: string | null;
    pillarFocus: string;
    membershipTier: string;
  } | null;
}

export function UsersManager({ initialUsers }: { initialUsers: UserItem[] }) {
  const router = useRouter();
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async (targetUserId: string, newRole?: string, newStatus?: string) => {
    setProcessingId(targetUserId);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, role: newRole, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
        setUsers(
          users.map((u) =>
            u.id === targetUserId
              ? { ...u, role: newRole || u.role, status: newStatus || u.status }
              : u
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
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <span className="text-xs text-slate-400 font-mono">Total Records: {filtered.length}</span>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Role (RBAC)</th>
                <th className="p-4">Status</th>
                <th className="p-4">Pillar</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          u.avatarUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                        }
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleUpdate(u.id, e.target.value, undefined)}
                      disabled={processingId === u.id}
                      className="px-2 py-1 text-[11px] bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="MODERATOR">MODERATOR</option>
                      <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                      <option value="MEMBER">MEMBER</option>
                      <option value="GUEST">GUEST</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">
                    {u.profile?.pillarFocus || "ALL"}
                  </td>

                  <td className="p-4 text-slate-400 font-mono">
                    {formatDate(u.createdAt)}
                  </td>

                  <td className="p-4 text-right">
                    {u.status === "ACTIVE" ? (
                      <button
                        onClick={() => handleUpdate(u.id, undefined, "SUSPENDED")}
                        disabled={processingId === u.id}
                        type="button"
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-rose-400 hover:bg-rose-950/40 border border-rose-500/30 transition-colors"
                        title="Suspend Account"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdate(u.id, undefined, "ACTIVE")}
                        disabled={processingId === u.id}
                        type="button"
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30 transition-colors"
                        title="Reactivate Account"
                      >
                        Reactivate
                      </button>
                    )}
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

