import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Brothers_Friends_Families (BFF) | Believe. Build. Become.",
  description:
    "A premier digital business ecosystem integrating transformative mindset, enterprise engineering, startup capitalization, and measurable social impact.",
  keywords: [
    "Brothers Friends Families",
    "BFF",
    "Believe Build Become",
    "Digital Business Ecosystem",
    "Mindset",
    "Solutions",
    "Business",
    "Social Impact",
    "Venture Platform",
    "Community",
  ],
  authors: [{ name: "Brothers_Friends_Families Global" }],
  openGraph: {
    title: "Brothers_Friends_Families (BFF) | Believe. Build. Become.",
    description:
      "A premier digital business ecosystem integrating transformative mindset, enterprise engineering, startup capitalization, and measurable social impact.",
    type: "website",
    locale: "en_US",
    siteName: "BFF Ecosystem",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#060B18] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeProvider>
          <AuthProvider initialUser={currentUser as any}>
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

