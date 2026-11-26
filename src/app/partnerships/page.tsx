"use client";

import React, { useState } from "react";
import {
  Handshake,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export default function PartnershipsPage() {
  const [form, setForm] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "CORPORATE_SPONSOR",
    proposalDetails: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit partnership request");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/40 border border-blue-500/20">
          <Handshake className="w-3.5 h-3.5" />
          Strategic Alliances
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Partner with Brothers_Friends_Families
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          We collaborate with international technology corporations, sovereign funds, research universities, and humanitarian organizations to amplify global progress.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-center space-y-6">
          <div className="p-4 w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Partnership Proposal Transmitted</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{form.contactName}</strong> from <strong className="text-white">{form.organizationName}</strong>. Our Business & Partnerships Council will review your proposal and schedule an executive briefing.
          </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization Name *</label>
                <input
                  type="text"
                  required
                  value={form.organizationName}
                  onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                  placeholder="e.g. Apex Global Technologies"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Contact Person *</label>
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins, Head of Partnerships"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="partnerships@company.com"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Partnership Category</label>
              <select
                value={form.partnershipType}
                onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}
                className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="CORPORATE_SPONSOR">Corporate Sponsor & CSR Partner</option>
                <option value="TECHNOLOGY_PARTNER">Enterprise Technology & Cloud Co-Development</option>
                <option value="COMMUNITY_AFFILIATE">Global Community Affiliate</option>
                <option value="ACADEMIC_INSTITUTION">Academic & Research Fellowship Institution</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Proposal Details & Collaboration Scope *
              </label>
              <textarea
                rows={5}
                required
                value={form.proposalDetails}
                onChange={(e) => setForm({ ...form, proposalDetails: e.target.value })}
                placeholder="Outline mutual objectives, targeted pillars, capital commitments or pilot project scope..."
                className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20"
              >
                {submitting ? "Transmitting Proposal..." : "Submit Strategic Proposal"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

