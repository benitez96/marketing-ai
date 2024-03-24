'use client'
import { Button } from "@nextui-org/react";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.theme === 'light' ? 'light' : 'dark'
  );

  const handleToggle = () => {
    setMode( mode => mode === 'light' ? 'dark' : 'light' )
  }


  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(mode == 'dark' ? 'light' : 'dark');
    root.classList.add(mode);

    localStorage.setItem("theme", mode);

  }, [mode]);

  return (
    <Button isIconOnly variant="light" onClick={handleToggle}>
      {
        mode === 'light'
          ? <BsMoonStarsFill color={'#b5afaa'} /> 
          : <BsFillSunFill color="#fbbf24"/>
      }
    </Button>
    
  )
}
