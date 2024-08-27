import "@/styles/globals.css";
import { Providers } from "./providers";
import CustomSessionProvider from "./sessionProvider";
// import { Session } from "next-auth"; // Import the correct type for session
// import { LayoutProps } from "framer-motion";
// import { ReactNode } from "react";
// interface RootLayoutProps extends LayoutProps {
//   children: ReactNode
//   session?: Session; // Make session optional
// }

export default function RootLayout({ children, session }: any) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <head />
      <body className="overflow-y-hidden !bg-background1 font-Inter">
        <CustomSessionProvider session={session}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative h-svh flex w-full transition-all duration-300 overflow-hidden">
              <main className="w-full h-full">{children}</main>
            </div>
          </Providers>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
