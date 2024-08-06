'use client'
import ContextProviderApp from "@/context/context";
import { SessionProvider } from "next-auth/react";
interface sessionType {
    children: React.ReactNode ,
    session : any
}
const CustomSessionProvider = ({children , session}:sessionType) => {
    return (
        <SessionProvider session={session}>
            <ContextProviderApp>
                {children}
            </ContextProviderApp>
        </SessionProvider>
    );
};
export default CustomSessionProvider;