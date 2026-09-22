import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Greenwave Engineering Pvt. Ltd. | Industrial MEP & Engineering Execution",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  description:
    "Greenwave Engineering delivers turnkey industrial MEP execution — HVAC, fire fighting, electrical, plumbing, and process systems — across India with in-house engineering, BIM, and technology-enabled project management.",
  keywords: [
    "Greenwave Engineering",
    "industrial MEP",
    "HVAC contractor India",
    "fire fighting systems",
    "turnkey mechanical contractor",
    "industrial engineering",
  ],
  openGraph: {
    title: "Greenwave Engineering Pvt. Ltd.",
    description:
      "Technology-enabled industrial MEP and engineering execution at scale across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
