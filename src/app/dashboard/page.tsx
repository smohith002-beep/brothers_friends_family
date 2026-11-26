import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  Sparkles,
  Calendar,
  FolderGit2,
  Bell,
  Award,
  ArrowRight,
  TrendingUp,
  Users2,
  CheckCircle2,
  ExternalLink,
  Shield,
  Clock,
  CreditCard,
  BookOpen
} from "lucide-react";

export const revalidate = 0; // dynamic dashboard

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Query user-specific dashboard data
  const [
    myRegistrations,
    myProjects,
    notifications,
    announcementSetting,
    certificates,
    totalConnections,
  ] = await Promise.all([
    prisma.eventRegistration.findMany({
      where: { userId: user.id },
      include: { event: true },
      take: 3,
      orderBy: { registeredAt: "desc" },
    }),
    prisma.project.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
      include: { milestones: true },
      take: 3,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.notification.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.systemSetting.findUnique({
      where: { key: "ANNOUNCEMENT_BANNER" },
    }),
    prisma.certificate.findMany({
      where: { userId: user.id },
      take: 2,
    }),
    prisma.connection.count({
      where: { OR: [{ userId: user.id }, { connectedUserId: user.id }] },
    }),
  ]);

  const completionRate = user.profile?.completionRate || 65;

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Membership Tier Header */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-[#0A1128] to-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                {user.profile?.membershipTier || "MEMBER"} TIER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Pillar: {user.profile?.pillarFocus || "ALL"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome Back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {user.profile?.headline || "Active Fellow in the Brothers_Friends_Families Ecosystem."}
            </p>
          </div>

          {/* Profile Completion Widget */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 min-w-[220px]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Profile Completion</span>
              <span className="text-cyan-400 font-bold font-mono">{completionRate}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <Link
              href="/dashboard/profile"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold block pt-1"
            >
              Update Credentials & Bio →
            </Link>
          </div>
        </div>
      </div>

      {/* Global Announcement Banner if present */}
      {announcementSetting && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>{announcementSetting.value}</span>
          </div>
          <Link href="/events" className="text-cyan-400 font-bold hover:underline flex-shrink-0 text-[11px]">
            View Calendar
          </Link>
        </div>
      )}

      {/* Quick Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0A1128] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">My Active Projects</div>
          <div className="text-2xl font-bold text-white mt-1">{myProjects.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0A1128] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Enrolled Events</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{myRegistrations.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0A1128] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Ecosystem Connections</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{totalConnections}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0A1128] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Certificates Earned</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{certificates.length}</div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Projects & Events (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Active Projects Module */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base font-bold text-white">My Projects & Collaboration</h2>
              </div>
              <Link href="/dashboard/projects" className="text-xs font-bold text-cyan-400 hover:underline">
                View All
              </Link>
            </div>

            {myProjects.length > 0 ? (
              <div className="space-y-3">
                {myProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{p.title}</div>
                      <div className="text-xs text-slate-400">
                        {p.pillar} • {p.status.replace("_", " ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-cyan-400 font-mono">
                        {p.progressPercentage}%
                      </div>
                      <span className="text-[10px] text-slate-500">Progress</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                You are not currently enrolled in any active project.
                <div className="pt-2">
                  <Link href="/projects" className="text-cyan-400 font-bold hover:underline">
                    Browse Collaborative Projects →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Registered Events Module */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h2 className="text-base font-bold text-white">My Registered Events</h2>
              </div>
              <Link href="/dashboard/events" className="text-xs font-bold text-cyan-400 hover:underline">
                Calendar
              </Link>
            </div>

            {myRegistrations.length > 0 ? (
              <div className="space-y-3">
                {myRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{reg.event.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{formatDate(reg.event.startDate)}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{reg.event.locationType}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                No active event registrations.
                <div className="pt-2">
                  <Link href="/events" className="text-cyan-400 font-bold hover:underline">
                    Explore Upcoming Summits →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Digital Pass, Academy, In-App Notifications & Quick Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Digital Membership Pass Card Widget */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#06152D] via-[#0A2348] to-[#06152D] border-2 border-[#C8A96B]/50 shadow-xl overflow-hidden membership-card-shimmer">
            <div className="flex items-center justify-between pb-3 border-b border-[#C8A96B]/30">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#C8A96B]" />
                <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                  Digital Membership Pass
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            <div className="py-4 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">FELLOWSHIP IDENTIFIER</div>
              <div className="text-lg font-mono font-bold text-[#C8A96B] tracking-wider">
                {user.profile?.memberCode || `BFF-${user.id.substring(0, 6).toUpperCase()}`}
              </div>
              <div className="text-xs text-slate-300">
                Tier: <span className="text-white font-bold">{user.profile?.membershipTier || "FELLOW"}</span> • Pillar: <span className="text-[#C8A96B] font-bold">{user.profile?.pillarFocus || "ALL"}</span>
              </div>
            </div>

            <Link
              href="/dashboard/card"
              className="w-full py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider btn-luxury-gold flex items-center justify-center gap-2 text-center"
            >
              <span>View Full Pass & QR Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* BFF Academy Overview Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white">BFF Academy & Curricula</h2>
              </div>
              <Link href="/dashboard/academy" className="text-xs font-bold text-[#C8A96B] hover:underline">
                View All
              </Link>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access executive masterclasses across Mindset, Applied AI, Venture Capital, and Social Impact.
            </p>
            <Link
              href="/dashboard/academy"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <span>Explore My Cohorts & Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </Link>
          </div>

          {/* Notifications Center */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">Notifications & Dispatches</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Live</span>
            </div>

            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1"
                  >
                    <div className="text-xs font-bold text-white">{n.title}</div>
                    <div className="text-[11px] text-slate-300 leading-snug">{n.message}</div>
                    <div className="text-[9px] text-slate-500 pt-1 font-mono">
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No unread notifications.</p>
            )}
          </div>

          {/* Quick Ecosystem Actions */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Fast Ecosystem Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/projects"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span>Propose a New Project</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </Link>
              <Link
                href="/dashboard/community/members"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span>Connect with Members</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </Link>
              <Link
                href="/dashboard/community/discussions"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span>Participate in Forum</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

