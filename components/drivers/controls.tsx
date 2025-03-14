import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Columns3 } from "lucide-react";
import { ListFilter } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";

type GenericObject = { [key: string]: string };
interface Props<TData> {
  table: Table<TData>;
}
const Controls = <TData,>({ table }: Props<TData>) => {
  const headers: GenericObject = {
    employeeNumber: "No. Gafete",
    fullname: "Nombre Completo",
    dpi: "DPI",
    position: "Cargo",
    schedule: "Horario",
    actions: "Acciones",
  };
  return (
    <div className="flex justify-between">
      <div className="relative flex items-center">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar piloto"
          className="w-64 h-9 pl-8"
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns3 />
              <span>Columnas</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                console.log(column.id);
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {headers[column.id]}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          <ListFilter />
          <span>Filtros</span>
        </Button>
        <Button size="sm" asChild>
          <Link href="/dashboard/empleados/nuevo?defaultValue=piloto">
            <UserRoundPlus />
            <span>Agregar Piloto</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export { Controls };
