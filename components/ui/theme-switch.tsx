"use client";
//* components
import { Button } from "@nextui-org/button";
import { useState , useEffect } from "react";
//* theme config
import { useTheme } from "next-themes";
import { VscColorMode } from "react-icons/vsc";

import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
const ThemeToggleBtn = () => {
    // states
    const [hasMounted, setHasMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setHasMounted(true), []);
    
    // this line is the key to avoid the error.
    if (!hasMounted) return null;

  return (
    <Button
      radius="sm"
      variant="light"
      className="fw-btn w-full flex items-center justify-between"
      startContent={
		<div className="flex items-center gap-2">
			<VscColorMode/> 
			Theme
		</div>
      }
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
	  <div>
	   		{theme === "light" ? <LuSun/> : <LuMoon/>}
	  </div>
    </Button>
  );
};

export default ThemeToggleBtn;