import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ClockInForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="file" className="text-primary font-semibold">
          Insertar fotografía
        </Label>
        <p className="text-[12px] text-muted-foreground">
          Tome una foto del establecimiento como prueba de su ingreso
        </p>
        <Input id="file" type="file" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location" className="text-primary font-semibold">
          Permitir ubicación
        </Label>
        <p className="text-[12px] text-muted-foreground">
          Active la ubicación de su dispositivo para poder marcar su horario
        </p>
        <Button variant="secondary">Activar la ubicación</Button>
      </div>
      <Button type="submit" className="w-full" disabled>
        Marcar Horario
      </Button>
    </form>
  );
};

export { ClockInForm };
