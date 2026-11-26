import React from "react";
import Link from "next/link";
import { Brain, CheckCircle2, ArrowRight, Sparkles, BookOpen, UserCheck, Flame } from "lucide-react";

export const metadata = {
  title: "Mindset Pillar | Brothers_Friends_Families (BFF)",
  description: "Personal breakthrough, executive mental conditioning, leadership resilience, and habit architecture.",
};

export default function MindsetPage() {
  const offerings = [
    {
      title: "Executive Mental Conditioning",
      desc: "Scientific protocols for emotional regulation, cognitive stress resilience, and rapid recovery during high-stakes venture operations.",
      icon: Brain,
    },
    {
      title: "Master Mentorship Circles",
      desc: "Curated one-on-one pairings between emerging leaders and veteran founders with decades of real-world operational scar tissue.",
      icon: UserCheck,
    },
    {
      title: "Habit Engineering & Peak Performance",
      desc: "Systematic habit frameworks that optimize daily focus, eliminate cognitive clutter, and protect deep creative flow state.",
      icon: Flame,
    },
    {
      title: "Breakthrough Masterclasses & Retreats",
      desc: "Immersive virtual workshops and sovereign retreats designed to deconstruct mental limits and align internal purpose.",
      icon: BookOpen,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/20">
          <Brain className="w-3.5 h-3.5" />
          Pillar 01 • Internal Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          The Mindset Pillar: <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Believe Before You Build.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Technical competence without internal equilibrium will ultimately collapse under scale. The Mindset pillar trains human fortitude, executive leadership, and purposeful vision.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offerings.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Methodology Section */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our 4-Stage Mindset Continuum</h2>
          <p className="text-slate-400 text-sm">
            How we cultivate unwavering confidence and executive poise in our fellows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400">STAGE 01</span>
            <h4 className="text-base font-bold text-white">Awareness</h4>
            <p className="text-xs text-slate-400">Diagnosing subconscious limiting beliefs, cognitive biases, and stress reactivity triggers.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400">STAGE 02</span>
            <h4 className="text-base font-bold text-white">Deconstruction</h4>
            <p className="text-xs text-slate-400">Dismantling outdated identity narratives that prevent high-stakes leadership execution.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400">STAGE 03</span>
            <h4 className="text-base font-bold text-white">Habit Architecture</h4>
            <p className="text-xs text-slate-400">Establishing non-negotiable physical, mental, and spiritual baseline routines.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400">STAGE 04</span>
            <h4 className="text-base font-bold text-white">Mastery & Mentorship</h4>
            <p className="text-xs text-slate-400">Operating with calm authority and extending guidance to the next generation of fellows.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Ready to Elevate Your Mental Horizon?</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Join our global mentorship cohorts and participate in private leadership sessions.
        </p>
        <Link
          href="/become-a-member"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all"
        >
          <span>Apply for Mindset Fellowship</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

