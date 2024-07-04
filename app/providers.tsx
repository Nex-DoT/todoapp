"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { context } from "@/context/context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  // const { state, dispatch } = context();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (state.email === '' && window.location.pathname !== '/signup') {
  //       try {
  //         const response = await fetch('/api/auth/verify' ,{ cache:'no-store'}); // Added leading slash
  //         const data = await response.json();
  //         console.log(data);
  //         if (data.status === 'failed') {
  //           router.push('/signup'); // Use router.push instead of window.location.href
  //         } else {
  //           dispatch({ type: 'ADDEMAIL', payload: data.user.email });
  //           dispatch({ type: 'SETTASK', payload: data.user.task });
  //           dispatch({ type: 'SETLIST', payload: data.user.list });
  //           dispatch({ type: 'SETNOTE', payload: data.user.notes });
  //           dispatch({ type: 'SETUSERNAME', payload: data.user.username });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [state.email, dispatch, router]);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
