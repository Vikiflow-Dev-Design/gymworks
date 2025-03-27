import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { checkAdminUser, WEBSITE_NAME } from "@/lib/utils";
import FirstVisitForm from "@/components/ui/first-visit-form";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - Your Fitness Journey Starts Here`,
  description:
    "Transform your life with our expert-led fitness programs and state-of-the-art facilities.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClerkLoading>
              <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <Navbar />
              <FirstVisitForm />
              {children}
              <Footer />
              <Toaster />
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
