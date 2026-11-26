import React from "react";
import { prisma } from "@/lib/prisma";
import { OpportunitiesExplorer } from "@/components/opportunities/OpportunitiesExplorer";
import { TrendingUp } from "lucide-react";

export const metadata = {
  title: "Business Opportunities & Startup Showcase | Brothers_Friends_Families (BFF)",
  description: "Browse accredited angel syndicates, technical co-founder searches, and enterprise pilot calls.",
};

export const revalidate = 30;

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    where: { status: "OPEN" },
    include: {
      author: { select: { name: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/40 border border-blue-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          Venture Ecosystem
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Business Opportunities & Startup Showcase
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Access vetted angel syndicates, corporate B2B pilot requests, technical co-founder searches, and strategic partnerships.
        </p>
      </div>

      <OpportunitiesExplorer initialOpportunities={JSON.parse(JSON.stringify(opportunities))} />
    </div>
  );
}

