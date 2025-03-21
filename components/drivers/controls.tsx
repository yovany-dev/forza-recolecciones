import Link from "next/link";
import React, { useEffect } from "react";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDriverStore } from "@/lib/store/useDriverStore";
import { useRouter, useSearchParams } from "next/navigation";

type GenericObject = { [key: string]: string };
interface Props<TData> {
  table: Table<TData>;
}
const Controls = <TData,>({
  table,
}: Props<TData>) => {
  const headers: GenericObject = {
    employeeNumber: "No. Gafete",
    fullname: "Nombre Completo",
    dpi: "DPI",
    position: "Cargo",
    schedule: "Horario",
    actions: "Acciones",
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, setSearch, filter, setFilter } = useDriverStore();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [search]);

  return (
    <div className="flex justify-between">
      <div className="relative flex items-center">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar piloto"
          className="w-64 h-9 pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter />
              <span>Filtros</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkInFirst"
                  checked={filter}
                  onCheckedChange={setFilter}
                />
                <label
                  htmlFor="checkInFirst"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Horario
                </label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
