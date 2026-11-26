"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Distributed Systems Engineer",
      pillar: "Solutions",
      department: "Core Architecture",
      location: "Remote (Global)",
      type: "Full-Time / Sovereign Contract",
      desc: "Lead the design of cryptographic sovereign identity and multi-region fault-tolerant data pipelines.",
    },
    {
      title: "Venture Deal Room Coordinator",
      pillar: "Business",
      department: "Venture Guild",
      location: "Singapore / Hybrid",
      type: "Full-Time",
      desc: "Manage deal flow evaluation, angel syndicate logistics, and founder pitch clinics across our Asian operations.",
    },
    {
      title: "Mindset & Executive Performance Coach",
      pillar: "Mindset",
      department: "Academy & Mentorship",
      location: "London / Remote",
      type: "Fellowship / Advisory",
      desc: "Deliver personalized psychological fortitude and behavioral conditioning sessions to high-growth founder cohorts.",
    },
    {
      title: "Grassroots IoT Operations Specialist",
      pillar: "Social Impact",
      department: "Humanitarian Telemetry",
      location: "Nairobi / On-Site",
      type: "Full-Time",
      desc: "Oversee solar and clean-water telemetry sensor deployments, local clinic calibrations, and community handover workshops.",
    },
  ];

  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSelectedRole(null);
        setSuccess(false);
      }, 2000);
    }, 800);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Briefcase className="w-3.5 h-3.5" />
          Careers & Fellowships
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Build Generational Infrastructure With Us
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          We are seeking world-class technologists, operators, performance coaches, and impact organizers who reject mediocrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((r, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                  {r.pillar}
                </span>
                <span className="text-xs text-slate-400 font-medium">{r.type}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {r.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">{r.desc}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{r.location}</span>
              </div>

              <button
                onClick={() => setSelectedRole(r)}
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Apply for Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0A1128] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Application: {selectedRole.title}</h3>
                <p className="text-xs text-cyan-400 mt-0.5">{selectedRole.pillar} • {selectedRole.location}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {success ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Your application and credentials have been received by the talent council.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@domain.com"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn or Portfolio URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary of Key Achievements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Highlight relevant distributed systems, venture, or leadership impact..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                  >
                    {submitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

