import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useClockInStore } from "@/lib/store/useClockInStore";

const ToggleLocation = () => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="location" className="text-primary font-semibold">
        Permitir ubicación
      </Label>
      <p className="text-[12px] text-muted-foreground">
        Para poder registrar su horario, habilita los permisos de ubicación
        desde la configuración de su navegador y vuelve a intentarlo.
      </p>
      {/* <Button variant="secondary">Activar la ubicación</Button> */}
    </div>
  );
};

const ClockInForm = () => {
  const { coordinatesStates } = useClockInStore();
  return (
    <form className="flex flex-col gap-6">
      {coordinatesStates.status === false ? <ToggleLocation /> : ""}
      <div className="grid gap-2">
        <Label htmlFor="file" className="text-primary font-semibold">
          Insertar fotografía
        </Label>
        <p className="text-[12px] text-muted-foreground">
          Tome una foto del establecimiento como prueba de su ingreso
        </p>
        <Input id="file" type="file" required />
      </div>
      <Button type="submit" className="w-full" disabled>
        Marcar Horario
      </Button>
    </form>
  );
};

export { ClockInForm };
