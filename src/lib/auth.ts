import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET;
export const AUTH_COOKIE_NAME = "bff_auth_token";

function getJwtSecret(): string {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters");
  }
  return JWT_SECRET;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  status: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  const secret = getJwtSecret();
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: {
      profile: true,
      assignedRoles: {
        include: { role: true },
      },
    },
  });

  if (!user || user.status === "SUSPENDED" || user.status === "DEACTIVATED") {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function requireRole(userRole: string, allowedRoles: string[]): boolean {
  if (userRole === "SUPER_ADMIN") return true;
  return allowedRoles.includes(userRole);
}

