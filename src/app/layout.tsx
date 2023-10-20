import { Roboto, Roboto_Condensed } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/utils/cn";

import styles from "./layout.module.scss";
import "@/styles/globals.scss";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Jobify",
    template: `%s | Jobify`,
  },
  description: "Job Tracking App",
  robots: {
    follow: true,
    index: true,
  },
  themeColor: "hsl(210, 36%, 96%)",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});
const robotoCondensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn([roboto.variable, robotoCondensed.variable])}>
      <body>
        <div className={styles.wrapper}>{children}</div>
      </body>
    </html>
  );
}
