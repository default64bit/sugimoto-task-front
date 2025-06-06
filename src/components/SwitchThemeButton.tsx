"use client";
import { memo, useEffect, useState } from "react";
import { TbSun, TbMoonFilled } from "react-icons/tb";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

const SwitchThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Button
      className="rounded-full shadow-xl"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="default"
      size="icon"
      suppressHydrationWarning
    >
      {isClient && resolvedTheme === "dark" ? <TbSun size="1.25rem" suppressHydrationWarning /> : <TbMoonFilled size="1.25rem" suppressHydrationWarning />}
    </Button>
  );
};

export default memo(SwitchThemeButton);
