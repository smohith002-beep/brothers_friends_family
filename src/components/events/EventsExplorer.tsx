"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Users,
  Video,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  pillar: string;
  category: string;
  bannerUrl: string | null;
  locationType: string;
  venue: string | null;
  meetingLink: string | null;
  startDate: string;
  endDate: string;
  capacity: number;
  registeredCount: number;
  status: string;
}

export function EventsExplorer({
  upcomingEvents,
  completedEvents,
}: {
  upcomingEvents: EventItem[];
  completedEvents: EventItem[];
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "COMPLETED">("UPCOMING");
  const [filterPillar, setFilterPillar] = useState<string>("ALL");
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; type: "success" | "error"; msg: string } | null>(null);

  const eventsToShow = activeTab === "UPCOMING" ? upcomingEvents : completedEvents;

  const filtered = eventsToShow.filter((e) => {
    return filterPillar === "ALL" || e.pillar.toUpperCase() === filterPillar.toUpperCase();
  });

  const handleRegister = async (eventId: string) => {
    if (!user) {
      router.push(`/login?redirect=/events`);
      return;
    }

    setRegisteringId(eventId);
    setFeedback(null);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({ id: eventId, type: "error", msg: data.error || "Registration failed" });
      } else {
        setFeedback({ id: eventId, type: "success", msg: "Registration confirmed! Details sent to dashboard." });
        router.refresh();
      }
    } catch (err) {
      setFeedback({ id: eventId, type: "error", msg: "Network error. Please try again." });
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        {/* Upcoming vs Completed Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("UPCOMING")}
            type="button"
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "UPCOMING"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Upcoming Programs ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            type="button"
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "COMPLETED"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Past Summits & Archives ({completedEvents.length})
          </button>
        </div>

        {/* Pillar Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["ALL", "MINDSET", "SOLUTIONS", "BUSINESS", "SOCIAL_IMPACT"].map((pil) => (
            <button
              key={pil}
              onClick={() => setFilterPillar(pil)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterPillar === pil
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {pil === "SOCIAL_IMPACT" ? "Social Impact" : pil}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ev) => {
          const isFull = ev.registeredCount >= ev.capacity;
          const isFeedback = feedback && feedback.id === ev.id;

          return (
            <div
              key={ev.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={ev.bannerUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80"}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#060B18]/90 text-cyan-400 border border-cyan-500/30 uppercase">
                      {ev.pillar}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300">
                      {ev.locationType}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(ev.startDate)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>

                  {ev.venue && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  )}

                  {/* Attendance gauge */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Registered Seats</span>
                      <span className="font-mono text-cyan-400">
                        {ev.registeredCount} / {ev.capacity}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (ev.registeredCount / ev.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 space-y-2">
                {isFeedback && (
                  <div
                    className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                      feedback.type === "success"
                        ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                        : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    <span>{feedback.msg}</span>
                  </div>
                )}

                {activeTab === "UPCOMING" ? (
                  <button
                    onClick={() => handleRegister(ev.id)}
                    disabled={isFull || registeringId === ev.id}
                    type="button"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {registeringId === ev.id
                      ? "Processing Registration..."
                      : isFull
                      ? "Capacity Reached"
                      : "Register for Program"}
                  </button>
                ) : (
                  <div className="w-full py-2 text-center text-xs text-slate-500 font-mono">
                    Program Successfully Concluded
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">No events found in this category.</p>
        </div>
      )}
    </div>
  );
}

