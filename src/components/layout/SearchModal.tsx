"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Brain,
  Cpu,
  TrendingUp,
  HeartHandshake,
  FolderGit2,
  Calendar,
  BookOpen,
  Briefcase
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent handles opening if triggered externally
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: "Mindset Architecture", category: "Core Pillar", href: "/pillars/mindset", icon: Brain, color: "text-purple-400" },
    { title: "Solutions & AI Engineering", category: "Core Pillar", href: "/pillars/solutions", icon: Cpu, color: "text-cyan-400" },
    { title: "Business & Angel Syndicates", category: "Core Pillar", href: "/pillars/business", icon: TrendingUp, color: "text-blue-400" },
    { title: "Social Impact Initiatives", category: "Core Pillar", href: "/pillars/social-impact", icon: HeartHandshake, color: "text-emerald-400" },
    { title: "Signature Collaborative Projects", category: "Projects", href: "/projects", icon: FolderGit2, color: "text-amber-400" },
    { title: "Global Summits & Masterclasses", category: "Events", href: "/events", icon: Calendar, color: "text-indigo-400" },
    { title: "BFF Academy & Curricula", category: "Education", href: "/academy", icon: BookOpen, color: "text-champagne-gold" },
    { title: "Business Opportunities & Deal Rooms", category: "Opportunities", href: "/opportunities", icon: Briefcase, color: "text-sky-400" },
  ];

  const filteredLinks = query.trim() === ""
    ? quickLinks
    : quickLinks.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#06152D]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0A2348] light:bg-white rounded-2xl border border-[#C8A96B]/30 shadow-2xl shadow-black/60 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 light:border-slate-200">
          <Search className="w-5 h-5 text-[#C8A96B]" />
          <input
            type="text"
            placeholder="Search ecosystem pillars, projects, summits, academy..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-white light:text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#C8A96B] bg-[#06152D] rounded border border-[#C8A96B]/30">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C8A96B] font-mono">
            {query.trim() ? "Search Results" : "Ecosystem Destinations"}
          </div>

          {filteredLinks.length > 0 ? (
            filteredLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#06152D]/80 light:hover:bg-slate-100 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#06152D] border border-slate-800 light:border-slate-200">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white light:text-slate-900 group-hover:text-[#C8A96B] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#C8A96B] group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          ) : (
            <div className="text-center py-10 text-xs text-slate-400">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#06152D]/90 light:bg-slate-50 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with precision inside BFF</span>
          <div className="flex items-center gap-2">
            <span>Official Portal</span>
            <span className="w-1 h-1 rounded-full bg-[#C8A96B]" />
            <span className="text-[#C8A96B] font-serif font-bold">BELIEVE. BUILD. BECOME.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
