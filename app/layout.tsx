import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import Menu from "@/components/organisms/Menu";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <head />
      <body className="h-full overflow-y-hidden !bg-background1 font-Inter">
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
      </body>
    </html>
  );
}
