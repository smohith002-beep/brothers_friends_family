import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AcademyExplorer } from "@/components/academy/AcademyExplorer";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Shield,
  Award,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const revalidate = 60;

export default async function AcademyPage() {
  const courses = await prisma.academyCourse.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96B]/30 bg-[#0A2348]/60 backdrop-blur-md">
          <GraduationCap className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B]">
            BFF Executive Academy & Curricula
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
          Master the Disciplines of <br />
          <span className="text-gold-gradient">Believe. Build. Become.</span>
        </h1>

        <div className="divider-gold-emblem max-w-xs mx-auto" />

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Rigorous cohort-based masterclasses and executive fellowships taught by battle-tested founders, distributed systems engineers, venture capitalists, and social architects.
        </p>
      </section>

      {/* 2. THREE ACADEMY PILLARS OF EXCELLENCE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0A2348]/40 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Shield className="w-5 h-5 text-[#C8A96B]" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white">
            High-Stakes Pedagogy
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero generic theory or recycled slides. Every curriculum focuses on live system architecture, operational psychology, and real capitalization mechanics.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A2348]/40 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white">
            Verifiable Credentials
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Graduates receive an authenticated BFF Academy Fellowship Certificate recorded in our cryptographic registry and tied to their Digital Membership Pass.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A2348]/40 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-[#06152D] w-fit border border-[#C8A96B]/30">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white">
            Peer Executive Cohorts
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Collaborate directly with fellow founders, lead architects, and community organizers in private cohort sprints, code reviews, and syndicate deal rooms.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE COURSES EXPLORER */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Current Curricula & Cohorts
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a pillar to view specialized learning modules and apply for enrollment.
          </p>
        </div>

        <AcademyExplorer courses={courses} />
      </section>

      {/* 4. ADMISSIONS BANNER */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#06152D] via-[#0A2348] to-[#040C1A] border-2 border-[#C8A96B]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A96B]">
            FELLOWSHIP & ADMISSIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Are You Ready to Step Into the Arena?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Academy curricula are included with verified BFF Ecosystem Fellowship. Apply for full membership to unlock all masterclasses and executive deal rooms.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <Link
            href="/become-a-member"
            className="btn-luxury-gold px-6 py-3 text-xs font-bold tracking-wide text-center"
          >
            Apply for Fellowship
          </Link>
          <Link
            href="/about"
            className="btn-luxury-outline px-6 py-3 text-xs font-bold tracking-wide text-center"
          >
            Learn About Our Heritage
          </Link>
        </div>
      </section>
    </div>
  );
}
