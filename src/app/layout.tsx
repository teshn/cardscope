import type { Metadata } from "next";
import { Silkscreen, Space_Grotesk } from "next/font/google";

import { ToastProvider } from "@/components/ui/toast-provider";
import { organizationStructuredData } from "@/lib/seo/structuredData";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cardscope.example"),
  title: {
    default: "CardScope | Card Detail Verification",
    template: "%s | CardScope",
  },
  description:
    "CardScope is a share-ready card lookup platform for checking dimensions, weight, print version, illustrator, and authenticity-related signals.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const organizationData = organizationStructuredData();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${silkscreen.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--paper)] text-[var(--ink)] antialiased">
        {children}
        <ToastProvider />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </body>
    </html>
  );
}
