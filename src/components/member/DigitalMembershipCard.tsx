"use client";

import React, { useState } from "react";
import { BffLogo } from "../brand/BffLogo";
import {
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ExternalLink,
  Award,
  Layers
} from "lucide-react";

interface DigitalMembershipCardProps {
  member: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    role: string;
    createdAt?: string | Date;
    profile?: {
      headline?: string | null;
      memberCode?: string | null;
      membershipTier?: string | null;
      pillarFocus?: string | null;
      company?: string | null;
      location?: string | null;
    } | null;
  };
}

export function DigitalMembershipCard({ member }: DigitalMembershipCardProps) {
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const memberCode = member.profile?.memberCode || `BFF-${member.id.substring(0, 6).toUpperCase()}`;
  const tier = member.profile?.membershipTier || "FELLOW";
  const pillar = member.profile?.pillarFocus || "ALL";
  const issueYear = member.createdAt ? new Date(member.createdAt).getFullYear() : 2026;

  const copyMemberCode = () => {
    navigator.clipboard.writeText(memberCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${member.name}'s Verified BFF Fellowship`,
        text: `Verified Fellow credentials for Brothers_Friends_Families (${memberCode}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyMemberCode();
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Container with Perspective */}
      <div className="relative mx-auto max-w-md w-full select-none">
        {/* Glow ambient background behind the card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#C8A96B]/30 via-cyan-500/20 to-[#C8A96B]/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

        {/* The Card */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative cursor-pointer rounded-2xl overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-[#06152D] via-[#0A2348] to-[#040C1A] border-2 border-[#C8A96B]/60 shadow-2xl transition-all duration-500 hover:scale-[1.02] membership-card-shimmer"
          style={{ minHeight: "260px" }}
        >
          {/* Subtle Background Guilloche / Watermark Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #C8A96B 1px, transparent 0)`,
              backgroundSize: "16px 16px",
            }}
          />

          {!isFlipped ? (
            /* FRONT OF THE CARD */
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              {/* Header: Brand & Pass Tag */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#06152D] border border-[#C8A96B] p-1 flex items-center justify-center shadow-lg">
                    <span className="font-serif font-black text-sm text-[#C8A96B]">BFF</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-serif uppercase tracking-widest text-[#C8A96B] font-bold">
                      Brothers_Friends_Families
                    </div>
                    <div className="text-[9px] tracking-wider text-slate-300 font-mono">
                      OFFICIAL ECOSYSTEM PASS
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/40">
                    <Sparkles className="w-3 h-3" />
                    <span>{tier}</span>
                  </span>
                </div>
              </div>

              {/* Middle: Member Name & Credentials */}
              <div className="space-y-1 pt-2">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-mono">
                  VERIFIED FELLOW
                </div>
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="text-xs text-[#D8ECFF] line-clamp-1">
                  {member.profile?.headline || "Executive Fellow in the BFF Collaborative Network"}
                </p>
              </div>

              {/* Bottom: ID, Pillar, Status, and Hologram Strip */}
              <div className="pt-4 border-t border-[#C8A96B]/30 flex items-end justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                    MEMBER IDENTIFIER
                  </div>
                  <div className="text-sm font-mono font-bold text-[#C8A96B] tracking-wider">
                    {memberCode}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                    PILLAR: <span className="text-white font-bold">{pillar}</span> • VALID FROM {issueYear}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white rounded-lg shadow-md border border-slate-300">
                    {/* Simulated SVG QR Code */}
                    <svg className="w-9 h-9" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" fill="white" />
                      {/* Outer corners */}
                      <rect x="2" y="2" width="8" height="8" stroke="#06152D" strokeWidth="2" fill="none" />
                      <rect x="4" y="4" width="4" height="4" fill="#06152D" />
                      <rect x="22" y="2" width="8" height="8" stroke="#06152D" strokeWidth="2" fill="none" />
                      <rect x="24" y="4" width="4" height="4" fill="#06152D" />
                      <rect x="2" y="22" width="8" height="8" stroke="#06152D" strokeWidth="2" fill="none" />
                      <rect x="4" y="24" width="4" height="4" fill="#06152D" />
                      {/* Inner data dots */}
                      <rect x="14" y="4" width="2" height="4" fill="#C8A96B" />
                      <rect x="18" y="6" width="2" height="4" fill="#06152D" />
                      <rect x="14" y="14" width="4" height="4" fill="#06152D" />
                      <rect x="4" y="14" width="4" height="2" fill="#06152D" />
                      <rect x="22" y="14" width="6" height="2" fill="#C8A96B" />
                      <rect x="14" y="24" width="4" height="4" fill="#06152D" />
                      <rect x="24" y="24" width="4" height="4" fill="#06152D" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BACK OF THE CARD */
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#C8A96B]/30 pb-2">
                <div className="flex items-center gap-1.5 text-xs text-[#C8A96B] font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CRYPTOGRAPHIC CERTIFICATION</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">STATUS: ACTIVE</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-[#06152D]/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Official Credo</div>
                  <div className="font-serif italic text-white text-sm">
                    &ldquo;Believe. Build. Become.&rdquo;
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-mono">ISSUED TO</span>
                    <span className="text-white font-semibold truncate block">{member.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">GOVERNANCE</span>
                    <span className="text-[#C8A96B] font-semibold block">{member.role}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed">
                  This digital credential grants access to closed-door BFF executive summits, angel deal rooms, sovereign project workspaces, and verified ecosystem benefits.
                </p>
              </div>

              <div className="text-center pt-2 border-t border-slate-800">
                <span className="text-[10px] text-cyan-400 font-mono">
                  Click anywhere to flip back
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto pt-1">
        <button
          onClick={copyMemberCode}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? "Copied ID!" : `Copy ${memberCode}`}</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-2 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>Save / Print Pass</span>
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-2 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share Pass</span>
        </button>
      </div>
    </div>
  );
}
