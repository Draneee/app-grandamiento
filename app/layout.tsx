import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import LayoutProvider from "@/containers/layout-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "APPgrandamiento",
  description: "Aplicacion para el agrandamiento del pene",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <LayoutProvider user={data.user}>{children}</LayoutProvider>
        <Toaster richColors position="bottom-center" />
        {/* <Analytics /> */}
      </body>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    </html>
  );
}
