import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MembersDirectory } from "@/components/community/MembersDirectory";
import { Users2 } from "lucide-react";

export const revalidate = 0;

export default async function CommunityMembersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const members = await prisma.user.findMany({
    where: { status: "ACTIVE" },
    include: {
      profile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Member Directory</h1>
        <p className="text-xs text-slate-400 mt-1">
          Discover verified founders, systems architects, venture partners, and social innovators across the 4 Pillars.
        </p>
      </div>

      <MembersDirectory
        members={JSON.parse(JSON.stringify(members))}
        currentUserId={user.id}
      />
    </div>
  );
}

