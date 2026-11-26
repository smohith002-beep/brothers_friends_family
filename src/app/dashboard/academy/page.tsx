import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers
} from "lucide-react";

export const revalidate = 0;

export default async function DashboardAcademyPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const enrollments = await prisma.academyEnrollment.findMany({
    where: { userId: user.id },
    include: {
      course: true,
    },
    orderBy: { enrolledAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            BFF Academy & Curricula
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your active cohort courses, syllabus progress, and executive fellowships.
          </p>
        </div>

        <Link
          href="/academy"
          className="btn-luxury-gold text-xs px-4 py-2 font-bold tracking-wide flex items-center gap-1.5 self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse All Curricula</span>
        </Link>
      </div>

      {/* Enrollments List */}
      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrollments.map((enr) => {
            const course = enr.course;
            let modules: string[] = [];
            if (course.curriculum) {
              try {
                modules = JSON.parse(course.curriculum);
              } catch (e) {
                modules = [
                  "Core Axioms & Operational Conditioning",
                  "Applied Systems Execution & Architecture",
                  "Cohort Capstone & Defense",
                ];
              }
            }

            return (
              <div
                key={enr.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5 bg-[#0A2348]/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 uppercase">
                      {course.pillar.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {enr.status.replace("_", " ")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Curriculum Progress</span>
                      <span className="text-[#C8A96B] font-bold">{enr.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-[#C8A96B] rounded-full transition-all duration-500"
                        style={{ width: `${enr.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Module Checklist */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">
                      Syllabus Breakdown
                    </div>
                    {modules.map((mod, idx) => {
                      const isComplete = (idx + 1) * 25 <= enr.progressPercentage;
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#06152D]/60 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${
                                isComplete ? "text-emerald-400" : "text-slate-600"
                              }`}
                            />
                            <span className={isComplete ? "text-slate-200 line-through" : "text-slate-300"}>
                              {mod}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            Module 0{idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.mentorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={course.mentorName}
                      className="w-6 h-6 rounded-full object-cover border border-[#C8A96B]/30"
                    />
                    <span className="truncate max-w-[140px] text-slate-300">{course.mentorName}</span>
                  </div>

                  <Link
                    href={`/academy`}
                    className="text-xs font-bold text-[#C8A96B] hover:underline flex items-center gap-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#0A2348]/20 border border-slate-800 space-y-4 max-w-xl mx-auto">
          <GraduationCap className="w-12 h-12 text-[#C8A96B] mx-auto opacity-70" />
          <h3 className="text-lg font-serif font-bold text-white">
            No Active Academy Enrollments
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            You have not yet enrolled in any masterclasses or executive fellowships. Accelerate your trajectory by enrolling in one of our foundational 4 Pillar curricula.
          </p>
          <div className="pt-2">
            <Link href="/academy" className="btn-luxury-gold text-xs px-5 py-2.5 font-bold tracking-wide inline-block">
              Explore Academy Curricula →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
