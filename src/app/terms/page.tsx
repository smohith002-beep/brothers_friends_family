import React from "react";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Brothers_Friends_Families (BFF)",
  description: "Terms and Conditions governing access to the BFF Ecosystem and platform.",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Ecosystem Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Ecosystem Governance</h1>
        <p className="text-xs text-slate-500 font-mono">Last Updated: 2026 • Version 2.4</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">1. Acceptance of Ecosystem Charter</h2>
          <p>
            By accessing or registering with Brothers_Friends_Families (BFF), you agree to abide by our code of mutual honor, technical integrity, and sovereign accountability. Unauthorized probing, harassment, credential sharing, or malicious exploitation is grounds for immediate expulsion and account suspension.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">2. Intellectual Property & Collaboration</h2>
          <p>
            Projects developed within collaborative workspaces retain their respective open-source or proprietary licensing as established by their designated project leads. The BFF brand name, monogram, and the tagline "BELIEVE. BUILD. BECOME." remain the exclusive trademark of Brothers_Friends_Families Global.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">3. Venture & Deal Room Advisory</h2>
          <p>
            The platform provides informational showcase tools and peer networking. No information presented constitutes an offer to buy or sell securities, nor does BFF act as a registered broker-dealer. Members participate in private syndicates at their own discretion and verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">4. Administrative Governance</h2>
          <p>
            The BFF Executive Council reserves the right to review, approve, moderate, or decline membership requests and community contributions to protect ecosystem trust and security.
          </p>
        </section>
      </div>
    </div>
  );
}

