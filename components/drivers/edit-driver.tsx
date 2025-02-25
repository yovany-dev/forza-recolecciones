import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetEditDriver() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar piloto</SheetTitle>
          <SheetDescription>
            Realice los cambios del piloto aquí. Haga clic en guardar cuando
            haya terminado.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="employeeNumber" className="">
              No. Gafete
            </Label>
            <Input id="employeeNumber" defaultValue="111654" className="" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="fullname" className="">
              Nombre Completo
            </Label>
            <Input
              id="fullname"
              defaultValue="Denilson Yovani Morales Chivalan"
              className=""
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="dpi" className="">
              Número de Documento (DPI)
            </Label>
            <Input id="dpi" defaultValue="3270080241402" className="" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="schedule" className="">
              Horario de Entrada
            </Label>
            <Input id="schedule" defaultValue="07:30" className="" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Guardar cambios</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
