import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Columns3 } from "lucide-react";
import { ListFilter } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const Controls = () => {
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
        <Button variant="outline" size="sm">
          <Columns3 />
          <span>Columnas</span>
        </Button>
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
