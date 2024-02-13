"use client";
import { usePathname } from "next/navigation";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-screen"
      style={{
        background: "url(/images/BGUI.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover'
      }}
    >
      <Header />
      {children}
    </div>
  );
}
