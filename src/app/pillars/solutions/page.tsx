import React from "react";
import Link from "next/link";
import { Cpu, Code, ShieldCheck, Database, Layers, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Solutions Pillar | Brothers_Friends_Families (BFF)",
  description: "Enterprise software architecture, applied AI, decentralized networks, and digital transformation.",
};

export default function SolutionsPage() {
  const capabilities = [
    {
      title: "Distributed Systems & Cloud Architecture",
      desc: "Architecting fault-tolerant, high-concurrency cloud infrastructures capable of sub-second multi-region latency and zero downtime.",
      icon: Database,
    },
    {
      title: "Applied AI & Agentic Orchestration",
      desc: "Deploying multi-agent LLM pipelines, autonomous reasoning agents, and domain-specialized machine intelligence workflows.",
      icon: Cpu,
    },
    {
      title: "Cybersecurity & Data Sovereignty",
      desc: "Zero-trust architectures, end-to-end cryptographic verifications, and sovereign digital identity protocols that safeguard user privacy.",
      icon: ShieldCheck,
    },
    {
      title: "Collaborative Open-Source Projects",
      desc: "Open engineering incubators where engineers inside BFF co-create production-grade frameworks, dev tools, and public digital goods.",
      icon: Code,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Cpu className="w-3.5 h-3.5" />
          Pillar 02 • Technical Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          The Solutions Pillar: <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Build Without Compromise.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          From sovereign data protocols to planetary-scale AI systems, the Solutions pillar translates complex theoretical breakthroughs into robust, production-ready digital reality.
        </p>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{c.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Featured Solutions Matrix */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Engineering Standards</h2>
          <p className="text-slate-400 text-sm">
            Every solution created inside the BFF ecosystem adheres to rigorous enterprise benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-2xl font-bold text-cyan-400 font-mono">99.99%</span>
            <h4 className="text-base font-bold text-white">Target Availability</h4>
            <p className="text-xs text-slate-400">Stateless edge execution with distributed replication and active-active failover.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-2xl font-bold text-blue-400 font-mono">&lt; 100ms</span>
            <h4 className="text-base font-bold text-white">P99 Edge Latency</h4>
            <p className="text-xs text-slate-400">Optimized asset delivery, serverless caching, and geo-distributed database primitives.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-2xl font-bold text-purple-400 font-mono">Zero Trust</span>
            <h4 className="text-base font-bold text-white">Cryptographic Security</h4>
            <p className="text-xs text-slate-400">Rigorous role-based access control, encrypted at rest and in transit with complete audit logging.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Have a Mission-Critical Problem to Solve?</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Collaborate with our senior technical fellows or submit an engineering project proposal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <span>Explore Active Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
          >
            <span>Request Enterprise Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

