"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Search, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Brothers_Friends_Families (BFF)?",
      a: "BFF is a premier sovereign digital business ecosystem that unites high-performance corporate infrastructure, private member communities, collaborative engineering workspaces, and measurable social impact.",
    },
    {
      q: "Who is eligible to become a verified BFF Member?",
      a: "Membership is open to proven founders, engineers, executives, angel investors, and social organizers who align with our credo: Believe. Build. Become. Candidates submit an official application detailing their statement of purpose, which is reviewed by the Executive Council.",
    },
    {
      q: "How does the Project Collaboration system work?",
      a: "Members can submit project proposals across any of the Four Pillars. Once approved by the administration, projects receive workspace tools, milestone tracking, task kanbans, and team member assignments to co-build real solutions.",
    },
    {
      q: "Are the business opportunities regulated securities?",
      a: "No. The BFF Business pillar provides private peer networking, startup showcases, and co-founder matchmaking. It does not solicit public securities, execute financial transactions, or provide regulated investment advice.",
    },
    {
      q: "How does BFF verify its Social Impact initiatives?",
      a: "Unlike traditional non-profits that rely on superficial photo-ops, BFF installs real-time IoT telemetry sensors that monitor clean water flow, educational hours, and solar kilowatts. All data is openly auditable.",
    },
    {
      q: "How can my enterprise establish a formal partnership with BFF?",
      a: "Enterprises, academic institutions, and corporate CSR arms can submit formal collaboration proposals through our Partnerships portal or contact our Executive Desk directly.",
    },
  ];

  const filtered = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Everything You Need to Know
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Clear answers regarding admissions, project governance, the four foundational pillars, and institutional alliances.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions or topics..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-xl border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                type="button"
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Have a question not answered here?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Our administrative operations team is available to assist you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
        >
          <span>Contact Concierge Desk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

