"use client";

import "./style/style.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { Chart, ArcElement } from "chart.js";
import "react-tooltip/dist/react-tooltip.css";
import "regenerator-runtime/runtime";
import ReactQueryWrapper from "./components/ReactQueryWrapper";
import ServerStateProvider from "./client/context";
import Cookies from "js-cookie";
import { useEffect } from "react";
import AuthQuery from "./client/queries/auth";
import Layout from "./components/Layout";
import Script from "next/script";
import { onBoardSlug } from "./constant";
Chart.register(ArcElement);

const inter = Inter({ subsets: ["latin"] });

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
        <Script
          src="https://kit.fontawesome.com/7ddfa833b0.js"
          crossOrigin="anonymous"
        ></Script>
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
