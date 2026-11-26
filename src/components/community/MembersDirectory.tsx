"use client";

import React, { useState } from "react";
import {
  Users2,
  Search,
  UserPlus,
  CheckCircle2,
  MapPin,
  Briefcase,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface MemberItem {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  profile: {
    headline: string | null;
    bio: string | null;
    location: string | null;
    company: string | null;
    skills: string | null;
    pillarFocus: string;
    membershipTier: string;
    linkedin: string | null;
  } | null;
}

export function MembersDirectory({ members, currentUserId }: { members: MemberItem[]; currentUserId: string }) {
  const [search, setSearch] = useState("");
  const [filterPillar, setFilterPillar] = useState("ALL");
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const filtered = members.filter((m) => {
    if (m.id === currentUserId) return false; // don't show self
    const matchPillar = filterPillar === "ALL" || m.profile?.pillarFocus === filterPillar;
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.profile?.headline && m.profile.headline.toLowerCase().includes(search.toLowerCase())) ||
      (m.profile?.skills && m.profile.skills.toLowerCase().includes(search.toLowerCase())) ||
      (m.profile?.company && m.profile.company.toLowerCase().includes(search.toLowerCase()));
    return matchPillar && matchSearch;
  });

  const handleConnect = async (targetUserId: string) => {
    setConnectingId(targetUserId);
    try {
      const res = await fetch("/api/community/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId }),
      });
      if (res.ok) {
        setConnectedIds([...connectedIds, targetUserId]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setConnectingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members by name, company, or skillset..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "MINDSET", "SOLUTIONS", "BUSINESS", "SOCIAL_IMPACT"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPillar(p)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterPillar === p
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {p === "SOCIAL_IMPACT" ? "Social Impact" : p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => {
          const isConnected = connectedIds.includes(member.id);

          return (
            <div
              key={member.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        member.avatarUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      }
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-cyan-500/40"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {member.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                        {member.profile?.pillarFocus || "Fellow"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    {member.profile?.headline || "Verified Ecosystem Fellow"}
                  </p>
                  {member.profile?.company && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>{member.profile.company}</span>
                    </div>
                  )}
                  {member.profile?.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{member.profile.location}</span>
                    </div>
                  )}
                </div>

                {member.profile?.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {member.profile.skills.split(",").slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {member.profile?.linkedin ? (
                  <a
                    href={member.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">BFF ID: {member.id.slice(0, 6)}</span>
                )}

                <button
                  onClick={() => handleConnect(member.id)}
                  disabled={isConnected || connectingId === member.id}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isConnected
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Request Sent</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{connectingId === member.id ? "Connecting..." : "Connect"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">No members found matching your search.</p>
        </div>
      )}
    </div>
  );
}

