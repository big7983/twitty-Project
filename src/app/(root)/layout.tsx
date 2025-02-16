"use client";

import "@/app/globals.css";
import Navber from "@/components/Navber";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50">
          <Navber />
        </header>
        <main className="bg-slate-50 relative px-4 py-4 sm:px-8 sm:py-8">
          <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center max-w-[750px] w-full">
              <SessionProvider>{children}</SessionProvider>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
