"use client";

import { Moon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const DarkMode = () => {
  const { setTheme } = useTheme();
  const localStorage = window.localStorage;
  const theme = localStorage.getItem("theme");

  const changeMode = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={changeMode}>
          <Moon />
          <span>Dark Mode</span>
        </SidebarMenuButton>
        <SidebarMenuAction className="mr-4">
          <Switch checked={theme == "dark"} onClick={changeMode} />
        </SidebarMenuAction>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export { DarkMode };
