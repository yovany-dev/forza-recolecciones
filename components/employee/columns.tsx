"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
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
import { employeeSchemaType } from "@/lib/zod/employee";
import { SheetEditEmployee } from "@/components/employee/sheet-edit-employee";
import { DialogDeleteEmployee } from "@/components/employee/dialog-delete-employee";

export const columns: ColumnDef<employeeSchemaType>[] = [
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
    id: "actions",
    cell: function Cell({ row }) {
      const employee = row.original;
      const employeePosition = employee.position.split(" ")[0];
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isSheetOpen, setIsSheetOpen] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      return (
        <>
          <SheetEditEmployee
            employee={employee}
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
          />
          <DialogDeleteEmployee
            uuid={employee.uuid}
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
                Editar {employeePosition.toLowerCase()}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  setIsDialogOpen(true);
                }}
              >
                Eliminar {employeePosition.toLowerCase()}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(String(employee.dpi))
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
