import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { driverSchema, driverSchemaType } from "@/lib/zod/driver";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingNotification } from "@/components/notifications";
import { successfulNotification } from "@/components/notifications";
import { ErrorNotification } from "@/components/notifications";
import { updateDriverAPI } from "@/lib/update-driver";
import { useDriverStore } from "@/lib/store/useDriverStore";

interface errorMessage {
  status: boolean;
  message: string;
}
interface Props {
  driver: driverSchemaType;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const SheetEditDriver: React.FC<Props> = ({ driver, isOpen, setIsOpen }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<driverSchemaType>({ resolver: zodResolver(driverSchema) });
  const [errorMessage, setErrorMessage] = useState<null | errorMessage>(null);
  const { updateDriver } = useDriverStore();

  const onSubmit: SubmitHandler<driverSchemaType> = async (data) => {
    setErrorMessage(null);
    const resUpdateDriver = await updateDriverAPI({
      ...data,
      uuid: driver.uuid,
    });

    if (resUpdateDriver.status == 200) {
      setIsOpen(false);
      updateDriver(driver.uuid, resUpdateDriver.driver);
      successfulNotification("Piloto actualizado exitosamente.");
    } else if (resUpdateDriver.status == 409) {
      setErrorMessage({
        status: true,
        message: resUpdateDriver.errorMessage,
      });
    } else {
      setErrorMessage({
        status: true,
        message: "Error el piloto no se pudo actualizar.",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <Label htmlFor="employeeNumber">No. Gafete</Label>
            <Input
              id="employeeNumber"
              {...register("employeeNumber")}
              defaultValue={driver.employeeNumber}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.employeeNumber?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="fullname">Nombre Completo</Label>
            <Input
              id="fullname"
              {...register("fullname")}
              defaultValue={driver.fullname}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="dpi">Número de Documento (DPI)</Label>
            <Input id="dpi" {...register("dpi")} defaultValue={driver.dpi} />
            <p className="h-6 text-xs text-red-500">{errors.dpi?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="schedule">Horario de Entrada</Label>
            <Input
              id="schedule"
              {...register("schedule")}
              defaultValue={driver.schedule}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.schedule?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="position">Cargo o Puesto</Label>
            <Input
              id="position"
              {...register("position")}
              defaultValue="Piloto Recolector"
              disabled
            />
          </div>
          <div className="h-[53.6px] my-4 flex">
            {isSubmitting && <LoadingNotification />}
            {errorMessage && (
              <ErrorNotification message={errorMessage.message} />
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting && true}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { SheetEditDriver };
