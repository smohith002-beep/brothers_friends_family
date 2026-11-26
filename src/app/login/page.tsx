"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { BffLogo } from "@/components/brand/BffLogo";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams.get("redirect");
  const redirectUrl =
    requestedRedirect?.startsWith("/") &&
    !requestedRedirect.startsWith("//") &&
    !requestedRedirect.includes("\\")
      ? requestedRedirect
      : "/dashboard";
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed");
      } else {
        await refreshUser();
        if (data.user.role === "SUPER_ADMIN" || data.user.role === "ADMIN") {
          router.push(redirectUrl.includes("dashboard") ? "/admin" : redirectUrl);
        } else {
          router.push(redirectUrl);
        }
        router.refresh();
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <BffLogo size="lg" showText={false} />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Member & Executive Sign In</h1>
        <p className="text-xs text-slate-400">
          Access the Brothers_Friends_Families private ecosystem and workspaces.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bff.com or your email"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <span>{submitting ? "Authenticating..." : "Sign In to Ecosystem"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

      <div className="text-center text-xs text-slate-400 space-y-1">
        <div>Not yet a member of Brothers_Friends_Families?</div>
        <div>
          <Link href="/register" className="text-cyan-400 font-bold hover:underline mr-2">
            Create Direct Account
          </Link>
          or
          <Link href="/become-a-member" className="text-blue-400 font-bold hover:underline ml-2">
            Apply for Fellowship
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-slate-400 text-xs">Loading secure gateway...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
