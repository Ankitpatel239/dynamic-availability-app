import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import Footer from "./footer/page";
import Navbar from "./navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hii there",
  description:
    "This website is build using Next.js and Tailwind CSS with Ankit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
