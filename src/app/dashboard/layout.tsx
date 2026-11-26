import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}

