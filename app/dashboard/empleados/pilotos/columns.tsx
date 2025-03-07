"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetEditDriver } from "@/components/drivers/edit-driver";
import { driverSchemaType } from "@/lib/zod/driver";

export const columns: ColumnDef<driverSchemaType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    header: "Nombre completo",
  },
  {
    accessorKey: "dpi",
    header: "DPI",
  },
  {
    accessorKey: "position",
    header: "Cargo",
  },
  {
    accessorKey: "schedule",
    header: "Horario",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <>
          <SheetEditDriver />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>Editar piloto</DropdownMenuItem>
              <DropdownMenuItem>Eliminar piloto</DropdownMenuItem>
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
