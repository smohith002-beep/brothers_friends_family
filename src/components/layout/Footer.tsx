"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BffLogo } from "../brand/BffLogo";
import {
  Send,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#040814] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-300">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BffLogo size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Brothers_Friends_Families (BFF) is a global digital business ecosystem integrating transformative mindset, enterprise engineering, startup capitalization, and measurable social impact.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Global Ecosystem Systems: Operational
              </span>
            </div>
            {/* Contact details */}
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>contact@bff-ecosystem.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Global Digital Operations Hub</span>
              </div>
            </div>
          </div>

          {/* Pillars Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Core Pillars
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pillars/mindset" className="hover:text-cyan-400 transition-colors">
                  Mindset Mastery
                </Link>
              </li>
              <li>
                <Link href="/pillars/solutions" className="hover:text-cyan-400 transition-colors">
                  Solutions & Tech
                </Link>
              </li>
              <li>
                <Link href="/pillars/business" className="hover:text-cyan-400 transition-colors">
                  Business & Ventures
                </Link>
              </li>
              <li>
                <Link href="/pillars/social-impact" className="hover:text-cyan-400 transition-colors">
                  Social Impact
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  All Ecosystem Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform & Network
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/become-a-member" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>Become a Member</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-cyan-400 transition-colors">
                  BFF Executive Academy
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Collaborative Projects
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-400 transition-colors">
                  Global Events & Summits
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-cyan-400 transition-colors">
                  Startup & Venture Hub
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-400 transition-colors">
                  Leadership & Council
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-cyan-400 transition-colors">
                  Careers & Fellowships
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:text-cyan-400 transition-colors">
                  Strategic Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence & Dispatch */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Ecosystem Dispatch
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Curated intelligence on mindset, software architecture, venture deals, and humanitarian programs.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription confirmed. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter official email"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-900/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-cyan-600 text-white rounded-md text-xs flex items-center justify-center transition-colors"
                    aria-label="Subscribe to dispatch"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[10px] text-slate-500">
                  Zero spam. Strictly verified strategic briefings.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Brothers_Friends_Families (BFF). All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-cyan-500 font-semibold">BELIEVE. BUILD. BECOME.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Ecosystem
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

