"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  const icon =
    theme === "dark" ? (
      <IconSun className="size-4" />
    ) : (
      <IconMoon className="size-4" />
    );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {icon}
    </Button>
  );
};

export default ModeToggle;
