import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns3 } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}
type GenericObject = { [key: string]: string };

const ColumnsTable = <TData,>({ table }: Props<TData>) => {
  const headers: GenericObject = {
    createdAt: "Fecha",
    employeeNumber: "No. Gafete",
    fullname: "Nombre Completo",
    dpi: "DPI",
    position: "Cargo",
    schedule: "Horario",
    checkIn: "H. Entrada",
    location: "Ubicación",
    photo: "Foto",
    state: "Estado",
    actions: "Acciones",
  };
  return (
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
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {headers[column.id]}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ColumnsTable };
