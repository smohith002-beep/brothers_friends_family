"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BffLogo } from "../brand/BffLogo";
import { useAuth } from "../providers/AuthProvider";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  CalendarCheck,
  Users2,
  MessageSquare,
  TrendingUp,
  Shield,
  LogOut,
  ArrowLeft,
  Award,
  CreditCard,
  BookOpen
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Digital Membership Pass", href: "/dashboard/card", icon: CreditCard },
    { label: "My Profile & Settings", href: "/dashboard/profile", icon: User },
    { label: "BFF Academy & Curricula", href: "/dashboard/academy", icon: BookOpen },
    { label: "My Projects & Tasks", href: "/dashboard/projects", icon: FolderGit2 },
    { label: "My Events & Certificates", href: "/dashboard/events", icon: CalendarCheck },
    { label: "Member Directory", href: "/dashboard/community/members", icon: Users2 },
    { label: "Community Discussions", href: "/dashboard/community/discussions", icon: MessageSquare },
    { label: "Venture Opportunities", href: "/opportunities", icon: TrendingUp },
  ];

  const isAdmin = user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN");

  return (
    <aside className="w-64 bg-[#060B18] border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-2 pt-2">
          <BffLogo size="sm" />
        </div>

        {/* Member Profile Card Snippet */}
        {user && (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-cyan-500/30"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-cyan-400 font-medium truncate">
                {user.profile?.headline || user.role}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Member Workspace
          </div>

          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-950/40 border border-amber-500/20 transition-colors"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Admin Control Center</span>
          </Link>
        )}

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Portal</span>
        </Link>

        <button
          onClick={logout}
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

