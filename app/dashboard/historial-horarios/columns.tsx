"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ColumnDef } from "@tanstack/react-table";
import { reportSchemaType } from "@/lib/zod/report";

import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<reportSchemaType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && "indeterminate")
        // }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      const dateISO = row.original.createdAt!;
      const formattedDate = format(new Date(dateISO), "dd/MM/yyyy", {
        locale: es,
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "employeeNumber",
    header: "No. Gafete",
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre Completo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dpi",
    header: "DPI",
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cargo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const position = row.original.position;
      const badgeTheme = {
        driver: "border-[#ff1010] bg-[#ff10101e] text-[#ff1010]",
        copilot: "border-[#ea5d1d] bg-[#ea5e1d1e] text-[#ea5d1d]",
      };
      return (
        <Badge
          variant="outline"
          className={cn(
            position == "PILOTO RECOLECTOR"
              ? badgeTheme.driver
              : badgeTheme.copilot
          )}
        >
          {position}
        </Badge>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "checkIn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() =>
            column.toggleSorting(!(column.getIsSorted() === "desc"))
          }
        >
          H. Entrada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => {
      const location = row.original.location;
      const badgeTheme = {
        true: "border-[#37b400] bg-[#37b4001e] text-[#37b400]",
        false: "border-[#f21600] bg-[#f216001e] text-[#f21600]",
      };
      const states: Record<string, string> = {
        ADMIN: "ADMIN",
        DETECTADA: "DETECTADA",
        NO_DETECTADA: "NO DETECTADA",
      };
      return (
        <Badge
          variant="outline"
          className={cn(
            location == "ADMIN"
              ? badgeTheme.true
              : badgeTheme.false && location == "DETECTADA"
              ? badgeTheme.true
              : badgeTheme.false
          )}
        >
          {states[location]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "photo",
    header: "Foto",
    cell: ({ row }) => {
      const photo = row.original.photo;
      const badgeTheme = {
        true: "border-[#37b400] bg-[#37b4001e] text-[#37b400]",
        false: "border-[#f21600] bg-[#f216001e] text-[#f21600]",
      };
      const states: Record<string, string> = {
        ADMIN: "ADMIN",
        CARGADA: "CARGADA",
        NO_CARGADA: "NO CARGADA",
      };
      return (
        <Badge
          variant="outline"
          className={cn(
            photo == "ADMIN"
              ? badgeTheme.true
              : badgeTheme.false || photo == "CARGADA"
              ? badgeTheme.true
              : badgeTheme.false
          )}
        >
          {states[photo]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.original.state;
      const badgeTheme: Record<string, string> = {
        ADMIN: "border-[#37b400] bg-[#37b4001e] text-[#37b400]",
        INGRESADO: "border-[#37b400] bg-[#37b4001e] text-[#37b400]",
        PENDIENTE: "border-[#ffc000] bg-[#ffc0001e] text-[#ffc000]",
        INGRESO_TARDE: "border-[#f21600] bg-[#f216001e] text-[#f21600]",
      };
      const states: Record<string, string> = {
        ADMIN: "ADMIN",
        INGRESADO: "INGRESADO",
        PENDIENTE: "PENDIENTE",
        INGRESO_TARDE: "INGRESO TARDE",
      };
      return (
        <Badge variant="outline" className={badgeTheme[state]}>
          {states[state]}
        </Badge>
      );
    },
  },
];
