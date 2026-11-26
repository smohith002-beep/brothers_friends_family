import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getPillarBadgeColor(pillar: string) {
  switch (pillar?.toUpperCase()) {
    case "MINDSET":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "SOLUTIONS":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "BUSINESS":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "SOCIAL_IMPACT":
    case "SOCIAL IMPACT":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

export function getStatusBadgeColor(status: string) {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
    case "APPROVED":
    case "COMPLETED":
    case "CONFIRMED":
    case "DONE":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "PENDING":
    case "PENDING_APPROVAL":
    case "UNDER_REVIEW":
    case "SUBMITTED":
    case "IN_PROGRESS":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "REJECTED":
    case "CANCELLED":
    case "SUSPENDED":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "DRAFT":
    case "NEW":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

