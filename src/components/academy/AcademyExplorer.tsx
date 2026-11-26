"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Brain,
  Cpu,
  TrendingUp,
  HeartHandshake,
  UserCheck,
  GraduationCap
} from "lucide-react";

interface AcademyCourse {
  id: string;
  title: string;
  slug: string;
  pillar: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  mentorName: string;
  mentorBio?: string | null;
  mentorAvatar?: string | null;
  curriculum?: string | null;
}

export function AcademyExplorer({ courses }: { courses: AcademyCourse[] }) {
  const router = useRouter();
  const { user } = useAuth();
  const [activePillar, setActivePillar] = useState<string>("ALL");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pillars = [
    { id: "ALL", label: "All Curricula" },
    { id: "MINDSET", label: "Mindset", icon: Brain },
    { id: "SOLUTIONS", label: "Solutions", icon: Cpu },
    { id: "BUSINESS", label: "Business", icon: TrendingUp },
    { id: "SOCIAL_IMPACT", label: "Social Impact", icon: HeartHandshake },
  ];

  const filteredCourses = activePillar === "ALL"
    ? courses
    : courses.filter((c) => c.pillar.toUpperCase() === activePillar);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      router.push(`/login?redirect=/academy`);
      return;
    }

    setEnrollingId(courseId);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/academy/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to enroll");
      }

      setSuccessMessage(data.message || "Enrolled successfully! You can access course materials in your Member Dashboard.");
      setTimeout(() => {
        router.push("/dashboard/academy");
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Toast Feedback */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Pillar Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {pillars.map((p) => {
          const isSelected = activePillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all ${
                isSelected
                  ? "bg-[#C8A96B] text-[#06152D] shadow-lg shadow-[#C8A96B]/20"
                  : "bg-[#0A2348] text-slate-300 hover:text-white hover:bg-[#06152D] border border-slate-800"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCourses.map((c) => {
          let syllabusList: string[] = [];
          if (c.curriculum) {
            try {
              syllabusList = JSON.parse(c.curriculum);
            } catch (e) {
              syllabusList = [
                "Foundational Principles & Cognitive Reframing",
                "Applied Architecture & Execution Frameworks",
                "Cohort Case Studies & Capstone Synthesis",
              ];
            }
          }

          return (
            <div
              key={c.id}
              className="glass-card rounded-2xl p-7 border border-[#C8A96B]/20 hover:border-[#C8A96B]/50 transition-all flex flex-col justify-between group relative overflow-hidden bg-gradient-to-b from-[#0A2348]/60 to-[#06152D]/80"
            >
              <div className="space-y-6">
                {/* Pillar & Level Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 uppercase tracking-wider">
                    {c.pillar.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>{c.duration}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-bold">{c.level}</span>
                  </div>
                </div>

                {/* Course Title & Description */}
                <div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Curriculum Syllabus Modules */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#C8A96B]">
                    Cohort Curriculum Overview
                  </div>
                  {syllabusList.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mentor Bio */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <img
                    src={c.mentorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                    alt={c.mentorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#C8A96B]/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-white font-serif">{c.mentorName}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{c.mentorBio || "BFF Executive Faculty"}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <GraduationCap className="w-4 h-4 text-[#C8A96B]" />
                  <span>Verified Charter Issued</span>
                </span>

                <button
                  onClick={() => handleEnroll(c.id)}
                  disabled={enrollingId === c.id}
                  className="btn-luxury-gold text-xs px-4 py-2 font-bold tracking-wide flex items-center gap-2"
                >
                  <span>{enrollingId === c.id ? "Enrolling..." : "Enroll in Curriculum"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
