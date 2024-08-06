import "@/styles/globals.css";
import { Providers } from "./providers";
import CustomSessionProvider from "./sessionProvider";
export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session:any
}) {


  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <head />
      <body className="h-full overflow-y-hidden !bg-background1 font-Inter">
          <CustomSessionProvider session={session}>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark"}}>
              <div className="relative h-screen flex w-full transition-all duration-300 overflow-hidden">
                <main className="w-full h-full">
                  {children}
                </main>
              </div>
            </Providers>
          </CustomSessionProvider>
      </body>
    </html>
  );
}
