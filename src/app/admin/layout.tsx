import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
    redirect("/login?redirect=/admin");
  }

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}

