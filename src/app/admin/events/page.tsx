import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminEventsManager } from "@/components/admin/AdminEventsManager";
import { CalendarPlus } from "lucide-react";

export const revalidate = 0;

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <CalendarPlus className="w-4 h-4" />
          <span>GLOBAL PROGRAM SCHEDULING</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Event & Masterclass Governance</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Schedule global summits, monitor registrations, and manage digital passes.
        </p>
      </div>

      <AdminEventsManager initialEvents={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}

