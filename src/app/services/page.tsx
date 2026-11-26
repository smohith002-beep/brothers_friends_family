import React from "react";
import Link from "next/link";
import {
  Layers,
  Cpu,
  Brain,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Globe2
} from "lucide-react";

export const metadata = {
  title: "Ecosystem Services | Brothers_Friends_Families (BFF)",
  description: "Comprehensive enterprise and community services across our 4 foundational pillars.",
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      pillar: "Mindset & Executive Development",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      icon: Brain,
      services: [
        {
          name: "High-Performance Executive Conditioning",
          desc: "Personalized psychological resilience and focus training for founders operating in high-volatility environments.",
        },
        {
          name: "Curated Master Mentorship Matchmaking",
          desc: "Confidential advisory pairings matching rising talent with veteran executives and industry titans.",
        },
        {
          name: "Sovereign Leadership Retreats & Masterclasses",
          desc: "Intensive in-person retreats focused on vision architecture, values alignment, and strategic clarity.",
        },
      ],
    },
    {
      pillar: "Solutions & Enterprise Tech",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      icon: Cpu,
      services: [
        {
          name: "Multi-Cloud & Distributed Architecture Consulting",
          desc: "Architecting zero-downtime, geo-distributed cloud applications and microservices pipelines.",
        },
        {
          name: "Applied AI & Multi-Agent Engineering",
          desc: "Deploying enterprise-grade autonomous reasoning systems, retrieval-augmented pipelines, and LLM automation.",
        },
        {
          name: "Zero-Knowledge Data Sovereignty Protocols",
          desc: "Implementing cryptographic identity verifications and privacy-preserving data architectures.",
        },
      ],
    },
    {
      pillar: "Business & Venture Acceleration",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      icon: TrendingUp,
      services: [
        {
          name: "Angel Syndicate & Capital Introduction",
          desc: "Private deal room access connecting vetted startups directly with strategic angels and family offices.",
        },
        {
          name: "Cross-Border Commercial Expansion",
          desc: "Strategic enterprise matchmaking to secure international corporate pilots and B2B vendor contracts.",
        },
        {
          name: "Unit Economics & Term-Sheet Advisory",
          desc: "Rigorous financial modeling, cap-table defense, and go-to-market optimization.",
        },
      ],
    },
    {
      pillar: "Social Impact & Civic Tech",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: HeartHandshake,
      services: [
        {
          name: "Verifiable Telemetry Installation",
          desc: "Deploying solar and clean water IoT sensors with open ledger streaming for public accountability.",
        },
        {
          name: "Global STEM Fellowships Sponsorship",
          desc: "Corporate CSR pipelines sponsoring fully-funded developer bootcamps and hardware for underserved youth.",
        },
        {
          name: "Community Autonomous Governance Transition",
          desc: "Operational training enabling local leaders to sustain humanitarian facilities independently.",
        },
      ],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Layers className="w-3.5 h-3.5" />
          Ecosystem Capabilities
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Comprehensive Services Across the Four Pillars
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Explore how Brothers_Friends_Families bridges human potential, enterprise engineering, startup capital, and verified humanitarian stewardship.
        </p>
      </div>

      <div className="space-y-12">
        {serviceCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">{cat.pillar}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {cat.services.map((svc, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{svc.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{svc.desc}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-800/60">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                      >
                        <span>Engage Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Need a Tailored Engagement?</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Contact our executive advisory team to discuss custom solutions or enterprise collaboration.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all"
        >
          <span>Schedule Executive Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

