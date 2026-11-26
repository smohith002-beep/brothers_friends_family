import React from "react";
import Link from "next/link";
import { Shield, Target, Compass, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Brothers_Friends_Families (BFF)",
  description: "Learn about the heritage, mission, vision, and core leadership driving the Brothers_Friends_Families ecosystem.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Uncompromising Integrity",
      desc: "Trust is our foundational currency. We prioritize transparent governance, ethical engineering, and long-term brotherhood over short-term expediency.",
    },
    {
      title: "Sovereign Excellence",
      desc: "Whether architecting mission-critical software or structuring multi-party venture deals, we operate at the highest standards of international craft.",
    },
    {
      title: "Collective Uplift",
      desc: "True victory is shared. We build ecosystems where every member's expansion actively multiplies the reach, resilience, and prosperity of the collective.",
    },
    {
      title: "Verifiable Social Impact",
      desc: "We reject superficial philanthropy. Our humanitarian initiatives are measured with strict telemetry, direct community governance, and open auditing.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Genesis",
      desc: "A brotherhood of veteran engineers, executive strategists, and community founders assembled to build an enduring digital sanctuary.",
    },
    {
      year: "2024",
      title: "Four Pillars Formalized",
      desc: "Codified the foundational four pillars: Mindset, Solutions, Business, and Social Impact, launching inaugural pilot cohorts.",
    },
    {
      year: "2025",
      title: "Global Network Expansion",
      desc: "Expanded across 14 nations, establishing verified venture deal rooms, collaborative open-source projects, and grassroots water initiatives.",
    },
    {
      year: "2026",
      title: "The BFF Sovereign Ecosystem",
      desc: "Launch of the complete unified digital business ecosystem, member portal, project collaboration workspace, and admin control suite.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Shield className="w-3.5 h-3.5" />
          Who We Are & Why We Exist
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Brothers_Friends_Families: <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Built on Brotherhood. Engineered for Scale.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          We are a global collective of ambitious professionals, technologists, founders, and community builders united by a singular credo: Believe. Build. Become.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
          <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To stand as the international benchmark for sovereign digital business ecosystems—where high-performance ambition meets deep human kinship, enabling individuals to unlock their peak capacity and deploy solutions that advance humanity.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
          <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To cultivate unshakeable Mindsets through disciplined executive mentoring, deliver robust technological Solutions through collaborative open-source engineering, generate sustainable Business prosperity through verified angel deal rooms, and enact generational Social Impact through transparent telemetry.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Our Non-Negotiable Core Values</h2>
          <p className="text-slate-400 text-sm">
            These four foundational pillars govern every partnership, project, and member admitted into the ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400">0{i + 1}.</span>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Journey Timeline */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Our Journey & Milestones</h2>
          <p className="text-slate-400 text-sm">
            From an intimate circle of trust to a global technology and venture alliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{m.year}</span>
              <h4 className="text-base font-bold text-white">{m.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why BFF Exists & CTA */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Brothers_Friends_Families Exists</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In a world increasingly dominated by superficial digital interactions, BFF stands as an antidote: a private, high-integrity collective where founders, engineers, and visionaries collaborate with the loyalty of brothers, the camaraderie of friends, and the enduring dedication of family.
        </p>
        <div className="pt-2">
          <Link
            href="/become-a-member"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            <span>Apply to Join the Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

