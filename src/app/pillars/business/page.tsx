import React from "react";
import Link from "next/link";
import { TrendingUp, Briefcase, Handshake, Users, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";

export const metadata = {
  title: "Business Pillar | Brothers_Friends_Families (BFF)",
  description: "Venture incubation, angel matchmaking, B2B dealmaking, and cross-border commercial acceleration.",
};

export default function BusinessPage() {
  const offerings = [
    {
      title: "Angel Syndicate & Investor Deal Rooms",
      desc: "Private deal rooms matching capital-efficient founders with accredited angel syndicates and strategic institutional family offices.",
      icon: TrendingUp,
    },
    {
      title: "Venture Incubator & Cohort Acceleration",
      desc: "Zero-fluff incubation covering product-market fit, unit economics, go-to-market execution, and institutional term-sheet preparation.",
      icon: Briefcase,
    },
    {
      title: "Cross-Border B2B Commercial Alliances",
      desc: "Direct enterprise pilot matchmaking connecting emerging software and industrial ventures with verified enterprise buyers.",
      icon: Handshake,
    },
    {
      title: "Founder Masterminds & Peer Audits",
      desc: "Confidential peer-review clinics where founders audit each other's financial models, conversion funnels, and churn rates.",
      icon: Users,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/40 border border-blue-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          Pillar 03 • Commercial Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          The Business Pillar: <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Become Generational.
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Sustainable enterprises are the engine of societal sovereignty. The Business pillar empowers entrepreneurs, angels, and operators to create durable, cash-flow positive, and ethically fortified ventures.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offerings.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer banner required by rule 8 */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Legal Ecosystem Advisory:</strong> Brothers_Friends_Families (BFF) operates as a private peer network, venture collaborative platform, and educational incubator. The platform does not solicit public securities, execute broker-dealer operations, or provide regulated investment management advice. All syndicates are private, accredited, and independently verified.
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Explore Current Business Opportunities</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Review vetted venture listings, co-founder calls, and enterprise pilot partnerships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/opportunities"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Browse Opportunities Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/partnerships"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
          >
            <span>Submit Venture Proposal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

