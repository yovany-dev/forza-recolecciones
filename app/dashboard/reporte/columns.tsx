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
import { SheetEditDriver } from "@/components/drivers/edit-driver";
import { DialogDeleteDriver } from "@/components/drivers/delete-driver";

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
    header: "Cargo",
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
            position == "Piloto Recolector"
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
    header: "H. Entrada",
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
      return (
        <Badge
          variant="outline"
          className={cn(
            location == "DETECTADA" ? badgeTheme.true : badgeTheme.false
          )}
        >
          {location}
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
      return (
        <Badge
          variant="outline"
          className={cn(
            photo == "CARGADA" ? badgeTheme.true : badgeTheme.false
          )}
        >
          {photo}
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
        "INGRESADO": "border-[#37b400] bg-[#37b4001e] text-[#37b400]",
        'PENDIENTE': "border-[#ffc000] bg-[#ffc0001e] text-[#ffc000]",
        "INGRESO TARDE": "border-[#f21600] bg-[#f216001e] text-[#f21600]",
      };
      return <Badge className={badgeTheme[state]}>{state}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isSheetOpen, setIsSheetOpen] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      return (
        <>
          {/* <SheetEditDriver
            driver={driver}
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
          />
          <DialogDeleteDriver
            uuid={driver.uuid}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          /> */}
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
                  navigator.clipboard.writeText(String(driver.dpi))
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
