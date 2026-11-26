import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DigitalMembershipCard } from "@/components/member/DigitalMembershipCard";
import {
  Shield,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Globe,
  Award
} from "lucide-react";

export const revalidate = 0;

export default async function DashboardCardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });

  if (!fullUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#C8A96B] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Digital Membership Pass
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official cryptographic credential for Brothers_Friends_Families ecosystem access.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>CRYPTOGRAPHICALLY VERIFIED</span>
        </div>
      </div>

      {/* The Digital Card Component */}
      <div className="py-6">
        <DigitalMembershipCard member={fullUser} />
      </div>

      {/* Pass Privileges & Protocol Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
        <div className="p-5 rounded-2xl bg-[#0A2348]/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Lock className="w-5 h-5 text-[#C8A96B]" />
          </div>
          <h3 className="text-sm font-serif font-bold text-white">
            Private Deal Rooms
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Grants direct entry to confidential venture pitch sessions, angel syndicate co-investments, and executive summits.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A2348]/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Globe className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-sm font-serif font-bold text-white">
            Global Summit Access
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Universal RSVP capability for in-person luxury retreats, virtual masterclasses, and international innovation roundtables.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A2348]/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-sm font-serif font-bold text-white">
            Fellowship Recognition
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Persistent on-chain and off-chain identity verifying your contributions across Mindset, Solutions, Business, and Social Impact.
          </p>
        </div>
      </div>
    </div>
  );
}
