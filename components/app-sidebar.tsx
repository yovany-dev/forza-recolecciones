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
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const data = {
  headers: {
    title: "Forza Delivery Express",
    subtitle: "Control Horario Recos",
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const user = useMemo(() => session?.user, [session]);

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
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
