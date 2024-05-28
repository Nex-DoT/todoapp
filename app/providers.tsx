"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import ContextProviderApp from "@/context/context";
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter()
	
	return (
		<NextUIProvider navigate={router.push}>
			<ContextProviderApp>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</ContextProviderApp>
		</NextUIProvider>
	);
}
