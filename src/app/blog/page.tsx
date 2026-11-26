import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { BookOpen, Clock, ArrowRight, User } from "lucide-react";

export const metadata = {
  title: "Insights & Intelligence Dispatch | Brothers_Friends_Families (BFF)",
  description: "Read authoritative briefings on mindset mastery, cloud architecture, venture economics, and verifiable impact telemetry.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { isPublished: true },
      include: {
        author: { select: { name: true, avatarUrl: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.blogCategory.findMany(),
  ]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          Intellectual Capital
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Insights & Ecosystem Dispatch
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          In-depth technical papers, founder playbooks, and strategic analyses authored by BFF Fellows across the Four Pillars.
        </p>
      </div>

      {/* Featured / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={post.coverImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#060B18]/90 text-cyan-400 border border-cyan-500/30 uppercase">
                    {post.category.name}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-8 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
              <div className="flex items-center gap-2.5">
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-500/30"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-300">{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Read Briefing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

