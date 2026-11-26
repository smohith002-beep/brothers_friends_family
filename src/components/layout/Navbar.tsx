"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BffLogo } from "../brand/BffLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../providers/AuthProvider";
import { SearchModal } from "./SearchModal";
import {
  ChevronDown,
  Menu,
  X,
  User,
  Shield,
  LayoutDashboard,
  LogOut,
  Sparkles,
  ArrowRight,
  Brain,
  Cpu,
  TrendingUp,
  HeartHandshake,
  Search,
  BookOpen,
  Briefcase,
  FolderGit2,
  Calendar,
  CreditCard
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemDropdownOpen, setEcosystemDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setEcosystemDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const pillarItems = [
    {
      title: "Mindset Architecture",
      tagline: "Vision & Executive Fortitude",
      desc: "Personal breakthrough, psychological conditioning & high-performance leadership",
      href: "/pillars/mindset",
      icon: Brain,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Enterprise Solutions",
      tagline: "Applied AI & Cloud Systems",
      desc: "Distributed infrastructure, autonomous AI agents & cyber resilience",
      href: "/pillars/solutions",
      icon: Cpu,
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Business & Capital",
      tagline: "Angel Syndicates & Co-Ventures",
      desc: "Venture incubation, commercial deal rooms & institutional capital alignment",
      href: "/pillars/business",
      icon: TrendingUp,
      accent: "text-[#C8A96B] bg-[#C8A96B]/10 border-[#C8A96B]/25",
    },
    {
      title: "Social Impact Initiatives",
      tagline: "Sovereign Community Transformation",
      desc: "Grassroots education, clean telemetry & sustainable generational development",
      href: "/pillars/social-impact",
      icon: HeartHandshake,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const ecosystemLinks = [
    { title: "BFF Academy & Curricula", desc: "Executive masterclasses & verified certifications", href: "/academy", icon: BookOpen },
    { title: "Signature Collaborative Projects", desc: "Mission-critical multi-disciplinary builds", href: "/projects", icon: FolderGit2 },
    { title: "Global Summits & Calendar", desc: "Executive convenings & deal room evenings", href: "/events", icon: Calendar },
    { title: "Commercial Opportunities", desc: "Venture co-creation & verified partner proposals", href: "/opportunities", icon: Briefcase },
  ];

  const isAdmin = user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#06152D]/95 light:bg-white/95 backdrop-blur-md border-b border-[#C8A96B]/25 light:border-slate-200 shadow-2xl shadow-black/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LEFT: Official BFF Logo */}
            <div className="flex-shrink-0">
              <BffLogo size="md" />
            </div>

            {/* CENTER NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname === "/"
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname === "/about"
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                About
              </Link>

              {/* ECOSYSTEM MEGA MENU (4 Pillars + Key Services + Academy) */}
              <div
                className="relative"
                onMouseEnter={() => setEcosystemDropdownOpen(true)}
                onMouseLeave={() => setEcosystemDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                    pathname.startsWith("/pillars") || pathname === "/services" || pathname === "/academy"
                      ? "text-[#C8A96B] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setEcosystemDropdownOpen(!ecosystemDropdownOpen)}
                >
                  <span>Ecosystem</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      ecosystemDropdownOpen ? "rotate-180 text-[#C8A96B]" : ""
                    }`}
                  />
                </button>

                {ecosystemDropdownOpen && (
                  <div className="absolute top-full -left-20 w-[680px] pt-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-6 bg-[#0A2348] light:bg-white rounded-2xl border border-[#C8A96B]/30 light:border-slate-200 shadow-2xl backdrop-blur-2xl space-y-6">
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                          <span className="text-xs font-serif font-bold tracking-widest text-[#C8A96B] uppercase">
                            The Four Foundational Pillars
                          </span>
                        </div>
                        <Link
                          href="/services"
                          className="text-xs text-slate-400 hover:text-[#C8A96B] transition-colors flex items-center gap-1"
                        >
                          <span>Explore Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* 4 Pillars Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {pillarItems.map((p) => {
                          const Icon = p.icon;
                          return (
                            <Link
                              key={p.title}
                              href={p.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#06152D]/80 light:hover:bg-slate-50 transition-colors border border-transparent hover:border-[#C8A96B]/20 group"
                            >
                              <div className={`p-2 rounded-lg border ${p.accent} mt-0.5`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-white light:text-slate-900 group-hover:text-[#C8A96B] transition-colors">
                                  {p.title}
                                </div>
                                <div className="text-[11px] text-[#C8A96B]/80 font-medium">
                                  {p.tagline}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {p.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Bottom Quick Links Bar */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 light:border-slate-100">
                        {ecosystemLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.title}
                              href={link.href}
                              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#06152D]/60 light:hover:bg-slate-50 text-xs text-slate-300 hover:text-white transition-colors group"
                            >
                              <Icon className="w-4 h-4 text-[#C8A96B] group-hover:scale-110 transition-transform" />
                              <div>
                                <div className="font-semibold text-white light:text-slate-900 text-xs group-hover:text-[#C8A96B]">
                                  {link.title}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {link.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/pillars/solutions"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname === "/pillars/solutions"
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Solutions
              </Link>

              <Link
                href="/pillars/business"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname === "/pillars/business"
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Business
              </Link>

              <Link
                href="/pillars/social-impact"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname === "/pillars/social-impact"
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Impact
              </Link>

              <Link
                href="/blog"
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide uppercase rounded-md transition-colors ${
                  pathname.startsWith("/blog")
                    ? "text-[#C8A96B] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Insights
              </Link>
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Ecosystem"
                className="p-2 rounded-lg text-slate-300 hover:text-[#C8A96B] hover:bg-white/5 transition-colors flex items-center gap-1.5"
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Switcher */}
              <ThemeToggle />

              {/* User Logged In / Dropdown OR Guest CTAs */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10 transition-colors border border-[#C8A96B]/30"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#0A2348] border border-[#C8A96B] flex items-center justify-center text-xs font-bold text-[#C8A96B]">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden md:inline-block text-xs font-semibold text-slate-200 pr-1 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-[#0A2348] light:bg-white rounded-xl border border-[#C8A96B]/30 light:border-slate-200 shadow-2xl backdrop-blur-xl z-50">
                      <div className="px-3 py-2 border-b border-slate-800 light:border-slate-100">
                        <div className="text-xs font-bold text-white light:text-slate-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-[#C8A96B] truncate font-mono">
                          {user.profile?.memberCode || user.role}
                        </div>
                      </div>

                      <div className="py-1 space-y-0.5">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#C8A96B]" />
                          <span>Member Dashboard</span>
                        </Link>

                        <Link
                          href="/dashboard/card"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <CreditCard className="w-4 h-4 text-[#C8A96B]" />
                          <span>Digital Membership Pass</span>
                        </Link>

                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <User className="w-4 h-4 text-cyan-400" />
                          <span>Profile & Credentials</span>
                        </Link>

                        <Link
                          href="/dashboard/academy"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span>BFF Academy</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
                          >
                            <Shield className="w-4 h-4 text-amber-400" />
                            <span>Executive Admin Suite</span>
                          </Link>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-800 light:border-slate-100">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/become-a-member"
                    className="btn-luxury-gold text-xs sm:text-sm px-4 py-2 font-bold tracking-wide"
                  >
                    Join BFF
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#06152D] border-b border-[#C8A96B]/20 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#C8A96B] hover:bg-white/5 rounded-lg"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#C8A96B] hover:bg-white/5 rounded-lg"
              >
                About
              </Link>

              {/* Mobile Pillars */}
              <div className="pt-2 pb-1 px-3 text-[11px] font-serif font-bold text-[#C8A96B] uppercase tracking-wider">
                Ecosystem Pillars
              </div>
              <Link
                href="/pillars/mindset"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Mindset</span>
              </Link>
              <Link
                href="/pillars/solutions"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Solutions</span>
              </Link>
              <Link
                href="/pillars/business"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                <TrendingUp className="w-4 h-4 text-[#C8A96B]" />
                <span>Business</span>
              </Link>
              <Link
                href="/pillars/social-impact"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>Social Impact</span>
              </Link>

              <div className="pt-2 pb-1 px-3 text-[11px] font-serif font-bold text-[#C8A96B] uppercase tracking-wider">
                Explore More
              </div>
              <Link
                href="/academy"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                BFF Academy
              </Link>
              <Link
                href="/projects"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Projects
              </Link>
              <Link
                href="/events"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Events
              </Link>
              <Link
                href="/opportunities"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Opportunities
              </Link>
              <Link
                href="/blog"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Insights
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Contact
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="block w-full py-2.5 text-center text-sm font-medium text-slate-300 bg-slate-900 rounded-xl border border-slate-800"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/become-a-member"
                    className="block w-full py-2.5 text-center text-sm font-bold btn-luxury-gold"
                  >
                    Join BFF
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="block w-full py-2.5 text-center text-sm font-bold btn-luxury-gold"
                >
                  Go to Member Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
