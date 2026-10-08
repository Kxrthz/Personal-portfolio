import type { Metadata, Viewport } from "next";
import { CursorProvider } from "../components/cursor/CursorProvider";
import "./globals.css";

const title = "Karthikeya — Software Developer";
const description = "Final-year BCA student and software developer focused on full-stack development, backend engineering, scalable applications, and AI/ML fundamentals.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = siteUrl ? [{ url: new URL("/share-image", siteUrl), width: 1200, height: 630, alt: "Koduru Karthikeya — Software Developer" }] : undefined;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description,
  applicationName: "Karthikeya Portfolio",
  authors: [{ name: "Koduru Karthikeya" }],
  creator: "Koduru Karthikeya",
  openGraph: {
    type: "website",
    title,
    description,
    siteName: title,
    locale: "en_IN",
    images: socialImage,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: socialImage,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070706",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    </head>
    <body><CursorProvider>{children}</CursorProvider></body>
  </html>;
}
