"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reportSchemaType } from "@/lib/zod/report";
import { SheetEditReport } from "@/components/report/sheet-edit-report";
import { DialogDeleteReport } from "@/components/report/dialog-delete-report";

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
  {
    id: "actions",
    cell: function Cell({ row }) {
      const report = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isSheetOpen, setIsSheetOpen] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      return (
        <>
          <SheetEditReport
            report={{ ...report, createdAt: new Date() }}
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
          />
          <DialogDeleteReport
            uuid={report.uuid as string}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  setIsSheetOpen(true);
                }}
              >
                Editar reporte
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  setIsDialogOpen(true);
                }}
              >
                Eliminar reporte
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(String(report.dpi))
                }
              >
                Copiar número de DPI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
