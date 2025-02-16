"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
