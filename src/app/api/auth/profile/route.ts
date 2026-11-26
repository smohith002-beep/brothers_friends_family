import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      headline,
      bio,
      location,
      phone,
      company,
      website,
      linkedin,
      github,
      twitter,
      skills,
      interests,
      pillarFocus,
      avatarUrl,
    } = await request.json();

    // Update user display name and avatar
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name ? name.trim() : user.name,
        avatarUrl: avatarUrl || user.avatarUrl,
        profile: {
          upsert: {
            create: {
              headline,
              bio,
              location,
              phone,
              company,
              website,
              linkedin,
              github,
              twitter,
              skills,
              interests,
              pillarFocus: pillarFocus || "MINDSET",
              completionRate: 85,
            },
            update: {
              headline,
              bio,
              location,
              phone,
              company,
              website,
              linkedin,
              github,
              twitter,
              skills,
              interests,
              pillarFocus: pillarFocus || undefined,
              completionRate: 90,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    const { passwordHash, ...safeUser } = updatedUser;
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile details" },
      { status: 500 }
    );
  }
}

