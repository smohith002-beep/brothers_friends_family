import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password, headline, primaryPillar } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role: "MEMBER",
        status: "ACTIVE",
        isVerified: true,
        avatarUrl: `https://avatar.vercel.sh/${encodeURIComponent(normalizedEmail)}.png`,
        profile: {
          create: {
            headline: headline?.trim() || "Ecosystem Member",
            pillarFocus: primaryPillar || "MINDSET",
            membershipTier: "STANDARD",
            completionRate: 50,
            skills: "Collaboration, Innovation",
            interests: "Mindset, Technology, Venture, Social Impact",
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Create user role mapping
    const memberRole = await prisma.role.findUnique({ where: { name: "MEMBER" } });
    if (memberRole) {
      await prisma.userRole.create({
        data: {
          userId: newUser.id,
          roleId: memberRole.id,
        },
      });
    }

    // Sign JWT and set cookie
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      name: newUser.name,
    });

    cookies().set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        userEmail: newUser.email,
        action: "USER_REGISTERED",
        module: "USERS",
        details: `New member account created: ${newUser.email}`,
      },
    });

    // Welcome notification
    await prisma.notification.create({
      data: {
        userId: newUser.id,
        title: "Welcome to Brothers_Friends_Families",
        message: "Your membership account has been initialized. Explore the 4 Pillars, discover active projects, and connect with global leaders.",
        type: "SUCCESS",
        link: "/dashboard",
      },
    });

    const { passwordHash, ...safeUser } = newUser;
    return NextResponse.json(
      {
        success: true,
        message: "Account registered successfully",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

