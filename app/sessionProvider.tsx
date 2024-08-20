'use client'
import ContextProviderApp from "@/context/context";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // حتماً فایل CSS رو هم وارد کن

interface sessionType {
    children: React.ReactNode ,
    session : any
}
const CustomSessionProvider = ({children , session}:sessionType) => {
    return (
        <SessionProvider session={session}>
            <ContextProviderApp>
                
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </ContextProviderApp>
        </SessionProvider>
    );
};
export default CustomSessionProvider;