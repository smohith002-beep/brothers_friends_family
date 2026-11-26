import React from "react";
import { prisma } from "@/lib/prisma";
import { Shield, Users, Globe2, Award } from "lucide-react";

export const metadata = {
  title: "Leadership Council & Architects | Brothers_Friends_Families (BFF)",
  description: "Meet the executive architects, pillar leads, and fellows guiding the Brothers_Friends_Families ecosystem.",
};

export const revalidate = 60;

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    where: {
      role: { in: ["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "MODERATOR"] },
    },
    include: {
      profile: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <Users className="w-3.5 h-3.5" />
          Ecosystem Leadership
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Executive Council & Pillar Leads
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          The practitioners, systems architects, venture partners, and humanitarian organizers stewarding the BFF global movement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((leader) => (
          <div
            key={leader.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={
                    leader.avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  }
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#060B18]/90 text-cyan-400 border border-cyan-500/30 uppercase">
                    {leader.profile?.pillarFocus || "Global"}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-400">
                  {leader.profile?.headline || "Ecosystem Architect"}
                </p>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {leader.profile?.bio || "Dedicated leader contributing to cross-border technology, venture, and mindset development."}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{leader.profile?.location || "Global Operations"}</span>
              <span className="font-mono text-cyan-400">{leader.profile?.membershipTier || "COUNCIL"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

