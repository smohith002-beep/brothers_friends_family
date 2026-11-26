"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    pillarInterest: "ALL",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send message");
      } else {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          pillarInterest: "ALL",
        });
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Mail className="w-3.5 h-3.5" />
          Direct Dispatch
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Contact Brothers_Friends_Families
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Reach our executive operations, partnership desk, or community coordinators. Every message is reviewed by leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Global Operations Office</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Brothers_Friends_Families coordinates operations across international technology hubs, venture centers, and grassroots field deployments.
            </p>

            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Official Correspondence</div>
                  <div className="text-white font-mono font-medium">contact@bff-ecosystem.org</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Executive Concierge</div>
                  <div className="text-white font-mono font-medium">+1 (800) 829-4233</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Operational Hub</div>
                  <div className="text-white">International Technology District, Global Operations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">SLA Response Time</div>
                  <div className="text-white">Under 24 Business Hours</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-bold text-slate-200 block">Looking to become a verified member?</span>
            <p>
              Please use the official admissions portal to submit your credentials and statement of purpose.
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="p-4 w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been stored securely in our executive administrative registry. Our operations team will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  type="button"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="David Chen"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="david@company.com"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Pillar</label>
                    <select
                      value={form.pillarInterest}
                      onChange={(e) => setForm({ ...form, pillarInterest: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="ALL">All / General Inquiry</option>
                      <option value="MINDSET">Mindset Pillar</option>
                      <option value="SOLUTIONS">Solutions Pillar</option>
                      <option value="BUSINESS">Business Pillar</option>
                      <option value="SOCIAL_IMPACT">Social Impact Pillar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Enterprise pilot consultation or media inquiry"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please be specific regarding project scope, timeline, and organizational alignment..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "Transmitting..." : "Send Secure Message"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

