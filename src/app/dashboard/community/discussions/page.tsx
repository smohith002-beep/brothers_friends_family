import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DiscussionsForum } from "@/components/community/DiscussionsForum";

export const revalidate = 0;

export default async function CommunityDiscussionsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const discussions = await prisma.discussion.findMany({
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      comments: {
        include: {
          author: { select: { name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Community Forum & Peer Discussions</h1>
        <p className="text-xs text-slate-400 mt-1">
          Engage in strategic discussions, peer architecture reviews, and high-trust venture debates.
        </p>
      </div>

      <DiscussionsForum
        initialDiscussions={JSON.parse(JSON.stringify(discussions))}
        currentUserId={user.id}
      />
    </div>
  );
}

