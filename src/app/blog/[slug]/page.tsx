import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return { title: "Article Not Found | BFF" };
  }

  return {
    title: `${post.title} | BFF Insights`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: {
          name: true,
          avatarUrl: true,
          profile: { select: { headline: true, bio: true } },
        },
      },
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Back Button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Insights</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
            {post.category.name}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic border-l-2 border-cyan-400 pl-4">
          {post.excerpt}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            {post.author.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-slate-400">
                {post.author.profile?.headline || "BFF Fellow & Contributor"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-96 w-full">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content Body */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && (
        <div className="pt-8 border-t border-slate-800 flex flex-wrap gap-2">
          {post.tags.split(",").map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Author Bio Box */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        {post.author.avatarUrl && (
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/40"
          />
        )}
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white">{post.author.name}</h4>
          <p className="text-xs text-cyan-400 font-medium">{post.author.profile?.headline}</p>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            {post.author.profile?.bio || "Active contributor and leadership architect in the Brothers_Friends_Families ecosystem."}
          </p>
        </div>
      </div>
    </article>
  );
}

