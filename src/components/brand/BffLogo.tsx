import React from "react";
import Link from "next/link";

interface BffLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "default";
}

export function BffLogo({
  className = "",
  showText = true,
  size = "md",
  variant = "gold",
}: BffLogoProps) {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3.5 group focus:outline-none rounded-lg ${className}`}
      aria-label="Brothers_Friends_Families (BFF)"
    >
      {/* Precision Geometric Luxury Monogram */}
      <div className={`relative ${iconDimensions} flex-shrink-0 transition-transform duration-500 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_16px_rgba(200,169,107,0.45)]"
        >
          <defs>
            <linearGradient id="bffGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFCA9B" />
              <stop offset="50%" stopColor="#C8A96B" />
              <stop offset="100%" stopColor="#9E7F43" />
            </linearGradient>
            <linearGradient id="bffBlueAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#168BFF" />
              <stop offset="100%" stopColor="#D8ECFF" />
            </linearGradient>
          </defs>

          {/* Luxury Hexagonal Shield */}
          <polygon
            points="24,2 44,13 44,35 24,46 4,35 4,13"
            fill="#06152D"
            stroke="url(#bffGoldGradient)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Interlocking Monogram (B, F, F) */}
          <path
            d="M14 14H24C27.3 14 30 16.7 30 20C30 22.3 28.7 24.3 26.8 25.2C29.4 26.3 31 28.8 31 31.8C31 35.2 28.3 38 24.9 38H14V14Z"
            stroke="url(#bffGoldGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
          />

          <path
            d="M19 14V38M19 26H28M19 19H29M24 14C27.5 14 30.5 16.5 30.5 20C30.5 23.5 27.5 26 24 26"
            stroke="url(#bffGoldGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Four Apex Nodes (Representing the 4 Pillars) */}
          <circle cx="24" cy="5" r="2" fill="#C8A96B" />
          <circle cx="41" cy="24" r="1.75" fill="#168BFF" />
          <circle cx="24" cy="43" r="2" fill="#C8A96B" />
          <circle cx="7" cy="24" r="1.75" fill="#DFCA9B" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-editorial font-bold tracking-[0.15em] text-white text-base md:text-lg leading-tight group-hover:text-[#DFCA9B] transition-colors">
              BFF
            </span>
            <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30 px-1.5 py-0.2 rounded bg-[#0A2348]/60">
              GLOBAL
            </span>
          </div>
          <span className="text-[9px] font-sans font-medium tracking-[0.2em] uppercase text-slate-400 leading-tight">
            Brothers_Friends_Families
          </span>
          <span className="text-[8px] font-editorial font-semibold tracking-[0.25em] text-[#C8A96B] uppercase leading-none mt-1">
            Believe • Build • Become
          </span>
        </div>
      )}
    </Link>
  );
}
