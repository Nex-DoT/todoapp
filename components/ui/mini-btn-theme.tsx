"use client";
//* components
import { Button } from "@nextui-org/button";
import { useState , useEffect } from "react";
//* theme config
import { useTheme } from "next-themes";
import { VscColorMode } from "react-icons/vsc";

import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
const MiniBtnTheme = () => {
    // states
    const [hasMounted, setHasMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setHasMounted(true), []);
    
    // this line is the key to avoid the error.
    if (!hasMounted) return null;

  return (
    <Button
      size='lg'
      isIconOnly
      variant='light'
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
	  <div>
	   		{theme === "light" ? <LuSun/> : <LuMoon/>}
	  </div>
    </Button>
  );
};

export default MiniBtnTheme;