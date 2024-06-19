'use client'
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import ContextProviderApp from "@/context/context";
import Menu from "@/components/organisms/Menu";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <head />
      <body className="h-full overflow-y-hidden !bg-background1 font-Inter">
        <ContextProviderApp>

          <Providers
            themeProps={{ attribute: "class", defaultTheme: "dark" }}
          >
            <div className="relative h-screen flex">
              <Menu />
              <main className="container w-full h-full">
                {children}
              </main>
            </div>
          </Providers>
        </ContextProviderApp>
      </body>
    </html>
  );
}
