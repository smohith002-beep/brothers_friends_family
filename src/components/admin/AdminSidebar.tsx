"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BffLogo } from "../brand/BffLogo";
import { useAuth } from "../providers/AuthProvider";
import {
  ShieldAlert,
  Users,
  UserCheck,
  FolderKanban,
  CalendarPlus,
  FileText,
  MessageSquareWarning,
  Handshake,
  Mail,
  Settings,
  History,
  LayoutDashboard,
  LogOut,
  ArrowLeft
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: "Executive Overview", href: "/admin", icon: ShieldAlert },
    { label: "Member Approvals", href: "/admin/approvals", icon: UserCheck },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Project Approvals", href: "/admin/projects", icon: FolderKanban },
    { label: "Event Management", href: "/admin/events", icon: CalendarPlus },
    { label: "Content & Blog", href: "/admin/blog", icon: FileText },
    { label: "Community Moderation", href: "/admin/moderation", icon: MessageSquareWarning },
    { label: "Partnership Requests", href: "/admin/partnerships", icon: Handshake },
    { label: "Contact Enquiries", href: "/admin/enquiries", icon: Mail },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
    { label: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#050914] border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand with Admin Badge */}
        <div className="px-2 pt-2 flex items-center justify-between">
          <BffLogo size="sm" />
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            ROOT
          </span>
        </div>

        {/* Admin Identity Card */}
        {user && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex items-center gap-3">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-amber-400 font-bold uppercase truncate">
                {user.role}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Executive Controls
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-400/80"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switcher */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-cyan-400" />
          <span>Member Workspace</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Public Portal</span>
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

