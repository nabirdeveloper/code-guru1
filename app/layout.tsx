import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";




export const metadata: Metadata = {
  title: "Code Guru",
  description: "Portfolio of Nabir Hossain",
  keywords: [
    "Nabir Hossain",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
  ],
  authors: [{ name: "Nabir Hossain", url: "https://nabirhossain.com" }],
  creator: "Nabir Hossain",
  openGraph: {
    title: "Code Guru - Portfolio of Nabir Hossain",
    description: "Explore the portfolio of Nabir Hossain, a skilled web developer.",
    url: "https://nabirhossain.com",
    siteName: "Code Guru",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Guru - Portfolio of Nabir Hossain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
