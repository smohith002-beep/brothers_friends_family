import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminSettingsManager } from "@/components/admin/AdminSettingsManager";
import { Settings } from "lucide-react";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.systemSetting.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1">
          <Settings className="w-4 h-4" />
          <span>ENVIRONMENT & CONFIGURATION ENGINE</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Global Ecosystem Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure live platform variables, brand parameters, maintenance status, and announcement banners.
        </p>
      </div>

      <AdminSettingsManager initialSettings={JSON.parse(JSON.stringify(settings))} />
    </div>
  );
}

