import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: { isPublic: true },
      orderBy: { key: "asc" },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch system settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Only Super Admin can modify global system settings" }, { status: 403 });
    }

    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const updated = await prisma.systemSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value), isPublic: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "SYSTEM_SETTING_UPDATED",
        module: "SYSTEM",
        details: `Updated system setting '${key}'`,
      },
    });

    return NextResponse.json({ success: true, message: `Setting '${key}' updated`, setting: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}

