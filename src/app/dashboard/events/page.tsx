import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Calendar, Award, Video, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function MemberEventsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [registrations, certificates] = await Promise.all([
    prisma.eventRegistration.findMany({
      where: { userId: user.id },
      include: { event: true },
      orderBy: { registeredAt: "desc" },
    }),
    prisma.certificate.findMany({
      where: { userId: user.id },
      include: { event: true },
    }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white">My Events & Verifiable Certificates</h1>
        <p className="text-xs text-slate-400 mt-1">
          Access your confirmed summit passes, interactive workshop links, and cryptographic certificates.
        </p>
      </div>

      {/* Confirmed Passes */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
          Confirmed Passes & Calendar ({registrations.length})
        </h2>

        {registrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                      {reg.event.pillar}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {reg.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1">{reg.event.title}</h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{formatDate(reg.event.startDate)}</span>
                    </div>

                    {reg.event.meetingLink && (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Video className="w-3.5 h-3.5" />
                        <a
                          href={reg.event.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline truncate"
                        >
                          Join Live Room: {reg.event.meetingLink}
                        </a>
                      </div>
                    )}

                    {reg.event.venue && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate">{reg.event.venue}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Pass ID: {reg.id.slice(0, 10)}</span>
                  <span>Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center border border-slate-800 text-xs text-slate-400 space-y-3">
            <p>You have not registered for any events yet.</p>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
            >
              <span>Explore Public Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Digital Certificates */}
      <div className="space-y-4 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-2">
          Verifiable Digital Certificates ({certificates.length})
        </h2>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-[#0A1128] to-purple-950/20 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Award className="w-6 h-6 text-purple-400" />
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                    CODE: {cert.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{cert.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Issued to {cert.recipientName} on {formatDate(cert.issuedDate)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Cryptographically Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 text-center">
            Certificates are issued automatically upon attendance and milestone completion in masterclasses and hackathons.
          </div>
        )}
      </div>
    </div>
  );
}

