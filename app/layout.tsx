"use client";

import "./style/style.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const onBoardSlug = ["/", "/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html className="h-fit min-h-screen" lang="en">
        <head>
            <title>Gia sư tài năng</title>
        </head>
      <body
        className={twMerge(
          inter.className,
          "h-full min-h-screen bg-gradient-to-b from-white to-nyanza"
        )}
      >
        {onBoardSlug.includes(pathname as string) && <Header />}
        {children}
      </body>
    </html>
  );
}
