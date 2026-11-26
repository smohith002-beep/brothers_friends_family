import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PILLARS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Users,
  Compass,
  Cpu,
  TrendingUp,
  HeartHandshake,
  Brain,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Target,
  Award,
  Layers,
  ArrowUpRight,
  Flame,
  Globe2,
  Briefcase,
  GraduationCap,
  Clock,
  ChevronRight
} from "lucide-react";

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  // Query real database records for dynamic home sections
  const [
    featuredPrograms,
    featuredProjects,
    opportunities,
    upcomingEvents,
    discussions,
    stats,
  ] = await Promise.all([
    prisma.program.findMany({
      take: 4,
      orderBy: { createdAt: "asc" },
    }),
    prisma.project.findMany({
      where: { featured: true },
      take: 3,
      include: {
        owner: { select: { name: true, avatarUrl: true } },
      },
    }),
    prisma.opportunity.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: { status: "UPCOMING" },
      take: 3,
      orderBy: { startDate: "asc" },
    }),
    prisma.discussion.findMany({
      take: 3,
      orderBy: { upvotes: "desc" },
      include: {
        author: { select: { name: true, avatarUrl: true } },
        _count: { select: { comments: true } },
      },
    }),
    Promise.all([
      prisma.user.count(),
      prisma.project.count({ where: { status: { in: ["APPROVED", "IN_PROGRESS", "COMPLETED"] } } }),
      prisma.event.count(),
      prisma.discussion.count(),
    ]),
  ]);

  const [totalMembers, totalProjects, totalEvents, totalDiscussions] = stats;

  const realTestimonials = [
    {
      quote:
        "BFF bridged the gap between vision and enterprise engineering. Through the Solutions pillar, our infrastructure transformed from fragile microservices to an impenetrable distributed network.",
      author: "Dr. Elena Rostova",
      role: "Chief Systems Architect @ Nexus Systems Core",
      pillar: "Solutions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The Mindset pillar is not generic motivation—it is ruthless psychological conditioning for high-stakes leadership. It fundamentally elevated my decision-making during our venture scaling.",
      author: "Marcus Vance",
      role: "Executive Coach & Performance Strategist",
      pillar: "Mindset",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The angel syndication and verified investor deal rooms in BFF's Business pillar allowed us to close our pre-seed round with sovereign, high-integrity partners in under 60 days.",
      author: "David Chen",
      role: "Venture Partner @ Apex Horizon",
      pillar: "Business",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#06152D] text-slate-100">
      {/* 1. TAJ PALACE-INSPIRED LUXURY CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Radial Lighting & Mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#168BFF]/15 via-[#C8A96B]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0A2348]/40 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#C8A96B]/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Subtle Guilloche / Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C8A96B 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#C8A96B]/40 bg-[#0A2348]/80 backdrop-blur-md shadow-2xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A96B]"></span>
            </span>
            <span className="text-xs font-serif font-bold tracking-widest text-[#C8A96B] uppercase">
              Brothers_Friends_Families Global Platform
            </span>
          </div>

          {/* Master Tagline & Grand Typography */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-white leading-[1.05]">
              BELIEVE. BUILD. <br />
              <span className="text-gold-gradient">
                BECOME.
              </span>
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-lg sm:text-2xl font-serif text-[#D8ECFF] max-w-3xl mx-auto font-normal tracking-wide">
              &ldquo;Bringing People, Ideas and Opportunities Together.&rdquo;
            </h2>

            {/* Official Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed pt-1">
              Brothers_Friends_Families is a collaborative ecosystem built around mindset, innovative solutions, business opportunities and meaningful social impact.
            </p>
          </div>

          {/* Emblem Divider */}
          <div className="divider-gold-emblem max-w-xs mx-auto py-2" />

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <Link
              href="#pillars"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-serif font-bold text-xs uppercase tracking-wider btn-luxury-outline flex items-center justify-center gap-2 group"
            >
              <span>Explore Our Ecosystem</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/become-a-member"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-serif font-bold text-xs uppercase tracking-wider btn-luxury-gold flex items-center justify-center gap-2 shadow-2xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>Become a Member</span>
            </Link>
          </div>

          {/* Ecosystem Trust Metrics Ribbon */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[#C8A96B]/20 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {totalMembers}+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#C8A96B] mt-1">
                Verified Fellows
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {totalProjects}+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#C8A96B] mt-1">
                Sovereign Projects
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {totalEvents}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#C8A96B] mt-1">
                Global Summits
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A96B]">
                100%
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 mt-1">
                Verifiable Impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY & HERITAGE (TAJ-INSPIRED EDITORIAL SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
              <Shield className="w-3.5 h-3.5 text-[#C8A96B]" />
              Corporate Identity & Heritage
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              An Elite Ecosystem Built on Fortitude, Trust, and High-Performance Engineering
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Brothers_Friends_Families (BFF) was established to reject the commoditization of human talent. In an era dominated by superficial transactional exchanges, BFF operates as a high-trust digital sanctuary and acceleration platform for visionary leaders.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20">
                <Target className="w-5 h-5 text-[#C8A96B] mb-2" />
                <h4 className="text-sm font-serif font-bold text-white">Our Vision</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  To become the premier sovereign digital business ecosystem for generational leaders worldwide.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0A2348]/60 border border-[#C8A96B]/20">
                <Award className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-sm font-serif font-bold text-white">Our Mission</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Empowering members to Believe with fortitude, Build mission-critical solutions, and Become world-class architects of progress.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] hover:bg-[#06152D] border border-[#C8A96B]/40 transition-colors"
              >
                <span>Read Full Company Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C8A96B]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
                alt="BFF Leadership Council and Collaboration"
                className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152D] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0A2348]/90 backdrop-blur-md border border-[#C8A96B]/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#C8A96B]">
                      BFF GLOBAL EXECUTIVE COUNCIL
                    </span>
                    <h5 className="text-sm font-serif font-bold text-white mt-0.5">
                      Cross-Border High-Trust Collaboration
                    </h5>
                  </div>
                  <Globe2 className="w-6 h-6 text-[#C8A96B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR INTERACTIVE CORE PILLARS SECTION */}
      <section id="pillars" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
            <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
            Foundational Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Four Dimensions of Total Transformation
          </h2>
          <div className="divider-gold-emblem max-w-xs mx-auto" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every initiative within the Brothers_Friends_Families ecosystem is anchored across our four core pillars, designed to take individuals and enterprises from aspiration to global realization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => {
            const icons = {
              mindset: Brain,
              solutions: Cpu,
              business: TrendingUp,
              "social-impact": HeartHandshake,
            }[pillar.id];
            const Icon = icons || Compass;

            return (
              <div
                key={pillar.id}
                className="glass-card rounded-2xl p-8 relative overflow-hidden group border border-[#C8A96B]/20 hover:border-[#C8A96B]/50 transition-all flex flex-col justify-between bg-gradient-to-b from-[#0A2348]/70 to-[#06152D]/90 shadow-xl"
              >
                {/* Accent Corner Glow */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className="p-3.5 rounded-xl border flex items-center justify-center bg-[#06152D]"
                      style={{
                        borderColor: `${pillar.accent}40`,
                        color: pillar.accent,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C8A96B] font-bold">
                      PILLAR 0{PILLARS.indexOf(pillar) + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors">
                      {pillar.name}
                    </h3>
                    <p className="text-xs font-medium text-[#C8A96B] tracking-wide mt-1">
                      {pillar.tagline}
                    </p>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] hover:text-white transition-colors"
                  >
                    <span>Explore {pillar.name} Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECTION A: FEATURED CURATED LUXURY PROGRAMS (TAJ EDITORIAL PRESENTATION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
              <GraduationCap className="w-3.5 h-3.5 text-[#C8A96B]" />
              Curated Executive Programs
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Signature Cohorts & Master Fellowships
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              Deep, immersive cohort programs engineered to develop generational leadership across Mindset, Solutions, Business, and Social Impact.
            </p>
          </div>

          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>View All Curricula</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="rounded-3xl overflow-hidden border border-[#C8A96B]/25 bg-[#0A2348]/60 hover:border-[#C8A96B]/60 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={
                      prog.bannerUrl ||
                      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06152D] via-[#06152D]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#06152D]/90 text-[#C8A96B] border border-[#C8A96B]/40 uppercase tracking-wider">
                      {prog.pillar.replace("_", " ")}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
                      {prog.duration}
                    </span>
                    <span className="text-[#C8A96B] font-bold">{prog.cohort} Intake</span>
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[#D8ECFF]/90 font-medium tracking-wide">
                    {prog.summary}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {prog.description}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                <span className="text-xs text-slate-400 font-mono">
                  Admissions Open
                </span>
                <Link
                  href="/become-a-member"
                  className="btn-luxury-gold text-xs px-4 py-2 font-bold tracking-wide"
                >
                  Apply for Cohort
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION B: SIGNATURE COLLABORATIVE PROJECTS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
              <Cpu className="w-3.5 h-3.5 text-[#C8A96B]" />
              Sovereign Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Signature Collaborative Projects
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              Production distributed software, low-power telemetry, and institutional systems co-engineered by verified BFF fellows.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>Browse Project Repository</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-7 border border-[#C8A96B]/20 flex flex-col justify-between group bg-[#0A2348]/50 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 uppercase font-mono">
                    {project.pillar}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {project.status.replace("_", " ")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-slate-300">
                    <span>Execution Milestones</span>
                    <span className="text-[#C8A96B] font-bold">{project.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-[#C8A96B] rounded-full"
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {project.owner.avatarUrl ? (
                    <img
                      src={project.owner.avatarUrl}
                      alt={project.owner.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#C8A96B]/30"
                    />
                  ) : null}
                  <span className="text-slate-300 truncate max-w-[120px]">{project.owner.name}</span>
                </div>

                <Link
                  href={`/projects`}
                  className="font-serif font-bold text-xs uppercase tracking-wider text-[#C8A96B] hover:text-white flex items-center gap-1"
                >
                  <span>Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SECTION C: BUSINESS OPPORTUNITIES & PRIVATE DEAL ROOMS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
              <Briefcase className="w-3.5 h-3.5 text-[#C8A96B]" />
              Commercial Opportunities
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Venture Syndicates & Enterprise Alliances
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              Curated co-investment deal rooms, institutional supplier contracts, and cross-border commercial partnerships.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="glass-card rounded-2xl p-7 border border-[#C8A96B]/20 flex flex-col justify-between group bg-[#0A2348]/50 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                    {opp.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {opp.location || "Global / Remote"}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-serif font-bold text-[#C8A96B]">{opp.organization}</div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors mt-1">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  Status: <span className="text-emerald-400 font-bold">{opp.status}</span>
                </span>

                <Link
                  href="/opportunities"
                  className="font-serif font-bold text-xs uppercase tracking-wider text-[#C8A96B] hover:text-white flex items-center gap-1"
                >
                  <span>Submit Pitch</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SECTION D: UPCOMING GLOBAL SUMMITS & CONVENINGS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
              <Calendar className="w-3.5 h-3.5 text-[#C8A96B]" />
              Global Calendar
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Upcoming Summits & Private Retraites
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              High-impact virtual masterclasses, closed-door deal rooms, and annual retreats in world-class destinations.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>Explore All Summits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl overflow-hidden border border-[#C8A96B]/20 bg-[#0A2348]/50 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={event.bannerUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#06152D]/90 text-[#C8A96B] border border-[#C8A96B]/30">
                      {event.locationType}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-serif font-bold text-[#C8A96B]">
                    {formatDate(event.startDate)}
                  </div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <span className="text-xs text-slate-400 font-mono">
                  {event.registeredCount}/{event.capacity} Enrolled
                </span>
                <Link
                  href="/events"
                  className="btn-luxury-gold text-xs px-3.5 py-1.5 font-bold tracking-wide"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SECTION E: AUTHENTIC VERIFIED FELLOW TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-[#C8A96B] bg-[#0A2348] border border-[#C8A96B]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B]" />
            Verified Fellow Testimonials
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Tested and Proven in High Stakes
          </h2>
          <div className="divider-gold-emblem max-w-xs mx-auto" />
          <p className="text-slate-300 text-sm">
            Hear from ecosystem leaders and fellows actively deploying systems across our 4 Pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {realTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 border border-[#C8A96B]/20 flex flex-col justify-between bg-[#0A2348]/40 shadow-xl"
            >
              <p className="text-sm text-slate-200 italic font-serif leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C8A96B]/40"
                />
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SECTION F: SOCIAL IMPACT INITIATIVES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C8A96B]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/30">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              Pillar 04: Social Impact
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Direct Community Transformation & Generational Equity
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              True leadership is measured by what you build for others. Brothers_Friends_Families combines deep engineering with grassroots community enablement—funding clean water telemetry, youth coding labs, and sustainable local infrastructure.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Open-source IoT environmental monitors deployed in under-resourced agricultural wells.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Over 1,200 students provided full scholarships for technical leadership & mindset bootcamps.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>100% of corporate partnership dues matched with direct social development grants.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/pillars/social-impact"
                className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
              >
                <span>Read Full Impact Charter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80"
                alt="BFF Social Impact Clean River Drive"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152D] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A2348]/90 backdrop-blur-md border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                      COMMUNITY TELEMETRY ROLLOUT
                    </span>
                    <h5 className="text-sm font-serif font-bold text-white">
                      Sensor-Driven Well Restoration Drive
                    </h5>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">100% DEPLOYED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INSTITUTIONAL ALLIANCES & CORPORATE PARTNERSHIP BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border-2 border-[#C8A96B]/40 bg-gradient-to-r from-[#06152D] via-[#0A2348] to-[#040C1A] shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C8A96B]">
              INSTITUTIONAL ALLIANCES & VENTURE PARTNERSHIPS
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Ready to Accelerate Your Enterprise with Brothers_Friends_Families?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Whether you are an institutional capital allocator, enterprise technology partner, or high-growth founder, BFF provides the sovereign infrastructure and verified global network to build what matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/become-a-member"
                className="btn-luxury-gold px-8 py-4 text-xs font-serif font-bold uppercase tracking-wider text-center"
              >
                Apply for Ecosystem Fellowship
              </Link>

              <Link
                href="/partnerships"
                className="btn-luxury-outline px-8 py-4 text-xs font-serif font-bold uppercase tracking-wider text-center"
              >
                Submit Corporate Partnership Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
