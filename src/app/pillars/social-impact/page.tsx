import React from "react";
import Link from "next/link";
import { HeartHandshake, Globe, Activity, Award, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Social Impact Pillar | Brothers_Friends_Families (BFF)",
  description: "Grassroots community development, STEM education, clean water initiatives, and verifiable impact telemetry.",
};

export default function SocialImpactPage() {
  const initiatives = [
    {
      title: "Verifiable Telemetry & Open Ledgers",
      desc: "Replacing vague charity claims with real-time IoT sensors measuring actual water flow, educational hours, and solar energy delivered directly to communities.",
      icon: Activity,
    },
    {
      title: "Global STEM & Leadership Fellowships",
      desc: "Fully sponsored technical hardware, software licenses, and mentorship pipelines empowering youth in emerging economies to become world-class developers.",
      icon: Award,
    },
    {
      title: "Clean Water & Autonomous Solar Grids",
      desc: "Grassroots humanitarian engineering deploying durable, community-governed clean water filtration stations and micro-solar installations.",
      icon: Globe,
    },
    {
      title: "Grassroots Civic & Community Leadership",
      desc: "Training local community organizers to govern infrastructure projects autonomously, ensuring permanent sovereignty and zero long-term dependency.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20">
          <HeartHandshake className="w-3.5 h-3.5" />
          Pillar 04 • Human Sovereignty
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          The Social Impact Pillar: <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Verifiable Grassroots Transformation.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          True social transformation cannot be faked with gala dinners and press releases. The Social Impact pillar applies rigorous engineering telemetry and direct community governance to generate permanent change.
        </p>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initiatives.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Telemetry Standards Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">The BFF Verifiable Impact Standard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">STANDARD 01</span>
            <h4 className="text-base font-bold text-white">100% Direct Allocation</h4>
            <p className="text-xs text-slate-400">All earmarked impact capital is deployed directly to project procurement with zero administrative leakage.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">STANDARD 02</span>
            <h4 className="text-base font-bold text-white">Public Sensor Feeds</h4>
            <p className="text-xs text-slate-400">Water flow and solar telemetry are streamed openly to our ecosystem ledger for continuous public audit.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">STANDARD 03</span>
            <h4 className="text-base font-bold text-white">Local Stewardship</h4>
            <p className="text-xs text-slate-400">Every initiative transitions into 100% local community ownership within 24 months of commissioning.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Partner on a Verifiable Impact Project</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Whether you represent a corporate CSR foundation or wish to mentor student fellows, join our global alliance.
        </p>
        <Link
          href="/become-a-member"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <span>Join Social Impact Alliance</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

