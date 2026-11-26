"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Shield,
  ArrowRight,
  Brain,
  Cpu,
  TrendingUp,
  HeartHandshake
} from "lucide-react";

export default function BecomeAMemberPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    organization: "",
    primaryPillar: "MINDSET",
    statementOfPurpose: "",
    linkedinUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit membership application");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const pillars = [
    { id: "MINDSET", name: "Mindset", icon: Brain, desc: "Personal breakthrough, leadership resilience, & habit mastery" },
    { id: "SOLUTIONS", name: "Solutions", icon: Cpu, desc: "Enterprise cloud systems, applied AI, & software engineering" },
    { id: "BUSINESS", name: "Business", icon: TrendingUp, desc: "Venture incubation, angel deal rooms, & commercial pilots" },
    { id: "SOCIAL_IMPACT", name: "Social Impact", icon: HeartHandshake, desc: "Verifiable telemetry, clean water, & community sovereignty" },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Ecosystem Admissions
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Apply to Become a BFF Member
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Brothers_Friends_Families is a curated community of visionaries, builders, and operators. Admissions are reviewed by our Executive Administrative Council.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-center space-y-6">
          <div className="p-4 w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Application Successfully Submitted</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{form.fullName}</strong>. Your statement of purpose and credentials have been recorded in the BFF Administrative Registry for review.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto text-left space-y-2">
            <div className="font-bold text-slate-200">What happens next:</div>
            <div>1. The Executive Council reviews candidate alignment across the selected pillar.</div>
            <div>2. You will receive an official response and onboarding credentials via <span className="text-cyan-400 font-mono">{form.email}</span>.</div>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700"
            >
              Return to Ecosystem Home
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
            >
              Member Sign In
            </Link>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                1. Candidate Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="marcus@domain.org"
                    className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Occupation / Role</label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                    placeholder="e.g. Systems Engineer / Founder"
                    className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. Apex Horizon Lab"
                    className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Pillar Selection */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                2. Primary Pillar Focus
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pil) => {
                  const Icon = pil.icon;
                  const isSelected = form.primaryPillar === pil.id;
                  return (
                    <div
                      key={pil.id}
                      onClick={() => setForm({ ...form, primaryPillar: pil.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10"
                          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />
                        <span className="text-sm font-bold text-white">{pil.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{pil.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purpose & Credentials */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                3. Purpose & Alignment
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Statement of Purpose * (Why do you want to join BFF?)
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.statementOfPurpose}
                  onChange={(e) => setForm({ ...form, statementOfPurpose: e.target.value })}
                  placeholder="Detail your personal or commercial mission, how you can contribute to fellow members, and what you aim to build..."
                  className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  LinkedIn or Verified Portfolio URL
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Strict privacy governance. Zero data leakage.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{submitting ? "Submitting Application..." : "Submit Membership Application"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

