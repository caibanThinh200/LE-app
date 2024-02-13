"use client";
import { usePathname } from "next/navigation";
import Header from "./components/Headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-screen"
    >
      <Header />
      {children}
    </div>
  );
}
