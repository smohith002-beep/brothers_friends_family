import React from "react";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Brothers_Friends_Families (BFF)",
  description: "BFF Sovereign Data Protection and Privacy Standards.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Sovereign Data Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-mono">Last Updated: 2026 • Version 2.4</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">1. Foundational Commitment</h2>
          <p>
            Brothers_Friends_Families (BFF) operates under the principle of data sovereignty. We collect strictly the information necessary to authenticate members, facilitate authorized collaboration, and measure verified project impact. We never sell, monetize, or broker member personal data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account Identity:</strong> Legal name, verified email address, hashed cryptographic credentials, and profile image.</li>
            <li><strong>Member Profile Data:</strong> Professional headline, bio, skill tags, pillar interests, and voluntary portfolio links.</li>
            <li><strong>Ecosystem Activity:</strong> Collaborative project milestones, event registrations, discussion contributions, and audit security telemetry.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">3. Security & Access Control</h2>
          <p>
            Our systems employ server-side password hashing (bcrypt), encrypted session tokens, and strict Role-Based Access Control (RBAC). Only authenticated users with verified permissions are permitted to view private community discussions or participate in project repositories.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">4. Contact & Inquiries</h2>
          <p>
            For privacy compliance requests, data export, or account deletion, contact our Data Governance Officer at: <span className="text-cyan-400 font-mono">privacy@bff-ecosystem.org</span>.
          </p>
        </section>
      </div>
    </div>
  );
}

