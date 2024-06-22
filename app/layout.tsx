'use client'
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import ContextProviderApp from "@/context/context";
import Menu from "@/components/organisms/Menu";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <head />
      <body className="h-full overflow-y-hidden !bg-background1 font-Inter">
        <ContextProviderApp>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative h-screen flex transition-all duration-300">
              <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
              <main className={`h-full transition-all duration-300 ${menuOpen ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'}`}>
                {children}
              </main>
            </div>
          </Providers>
        </ContextProviderApp>
      </body>
    </html>
  );
}
