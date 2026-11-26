import React from "react";
import { prisma } from "@/lib/prisma";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Events & Global Summits | Brothers_Friends_Families (BFF)",
  description: "Participate in transformative leadership summits, AI hackathons, and venture matchmaking evenings.",
};

export const revalidate = 30;

export default async function EventsPage() {
  const [upcomingEvents, completedEvents] = await Promise.all([
    prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { startDate: "asc" },
    }),
    prisma.event.findMany({
      where: { status: "COMPLETED" },
      orderBy: { startDate: "desc" },
    }),
  ]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/20">
          <Calendar className="w-3.5 h-3.5" />
          Global Calendar & Summits
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Executive Summits, Masterclasses & Hackathons
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Access high-caliber in-person summits, virtual engineering sprints, and angel pitch sessions organized across the 4 Pillars.
        </p>
      </div>

      <EventsExplorer
        upcomingEvents={JSON.parse(JSON.stringify(upcomingEvents))}
        completedEvents={JSON.parse(JSON.stringify(completedEvents))}
      />
    </div>
  );
}

