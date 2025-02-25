import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateAssistant = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auxiliar</CardTitle>
        <CardDescription>
          Complete la información del nuevo auxiliar. Por favor, no deje campos
          vacíos.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="employeeNumber">No. Gafete</Label>
          <Input id="employeeNumber" defaultValue="111654" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="fullname">Nombre Completo</Label>
          <Input
            id="fullname"
            defaultValue="Denilson Yovani Morales Chivalan"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="dpi">Número de Documento (DPI)</Label>
          <Input id="dpi" defaultValue="3270080241402" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="schedule">Horario de Entrada</Label>
          <Input id="schedule" defaultValue="08:30" />
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="position">Cargo o Puesto</Label>
          <Input id="position" defaultValue="Auxiliar Recolector" disabled />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="border border-[#ea580c]">
          Cancelar
        </Button>
        <Button>Guardar</Button>
      </CardFooter>
    </Card>
  );
};

export { CreateAssistant };
