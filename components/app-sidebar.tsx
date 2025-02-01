"use client";

import * as React from "react";
import {
  Grid2x2Plus,
  History,
  FolderInput,
  Settings,
  Truck,
  UserCog,
  LayoutDashboard,
} from "lucide-react";

import { NavGeneral } from "@/components/nav-general";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SidebarHeaderContent } from "@/components/sidebar-header-content";
import { DarkMode } from "@/components/dark-mode";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import ForzaDeliveryIcon from "@/public/forza-delivery-icon.png";

const data = {
  headers: {
    title: "Forza Delivery Express",
    subtitle: "Time Tracking",
    logo: ForzaDeliveryIcon,
  },
  navGeneral: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reporte",
      url: "#",
      icon: Grid2x2Plus,
    },
    {
      name: "Exportar datos",
      url: "#",
      icon: FolderInput,
    },
    {
      name: "Historial de horarios",
      url: "#",
      icon: History,
    },
  ],
  navMain: [
    {
      title: "Configurar usuarios",
      url: "/users",
      icon: UserCog,
      isActive: false,
      items: [
        {
          title: "Lista de usuarios",
          url: "#",
        },
        {
          title: "Agregar nuevo usuario",
          url: "#",
        },
      ],
    },
    {
      title: "Configurar empleados",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Pilotos",
          url: "/dashboard/empleados/pilotos",
        },
        {
          title: "Auxiliares",
          url: "/dashboard/empleados/auxiliares",
        },
      ],
    },
    {
      title: "Ajustes",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Editar perfil",
          url: "#",
        },
        {
          title: "Ajustar horarios",
          url: "#",
        },
        {
          title: "Copias de seguridad",
          url: "#",
        },
        {
          title: "Formatos de exportación",
          url: "#",
        },
      ],
    },
  ],
  user: {
    name: "admin",
    email: "admin@forzadelivery.com",
    avatar: "https://github.com/midudev.png",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderContent headers={data.headers} />
      </SidebarHeader>
      <SidebarContent>
        <NavGeneral items={data.navGeneral} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <DarkMode />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
