"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { employeeSchema, employeeSchemaType } from "@/lib/zod/employee";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingNotification } from "@/components/notifications";
import { successfulNotification } from "@/components/notifications";
import { ErrorNotification } from "@/components/notifications";
import { createDriverService } from "@/services/driverService";

interface errorMessage {
  status: boolean;
  message: string;
}
const CreateDriver = () => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<employeeSchemaType>({ resolver: zodResolver(employeeSchema) });
  const [errorMessage, setErrorMessage] = useState<null | errorMessage>(null);

  const onSubmit: SubmitHandler<employeeSchemaType> = async (data) => {
    setErrorMessage(null);
    const driver = await createDriverService(data);

    if (driver.status == 201) {
      reset();
      successfulNotification("Piloto creado exitosamente.");
    } else if (driver.status == 409) {
      setErrorMessage({
        status: true,
        message: driver.errorMessage,
      });
    } else {
      setErrorMessage({
        status: true,
        message: "Error el piloto no se pudo crear.",
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Piloto</CardTitle>
        <CardDescription>
          Complete la información del nuevo piloto. Por favor, no deje campos
          vacíos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-2 gap-x-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1">
            <Label htmlFor="employeeNumber">No. Gafete</Label>
            <Input id="employeeNumber" {...register("employeeNumber")} />
            <p className="h-6 text-xs text-red-500">
              {errors.employeeNumber?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="fullname">Nombre Completo</Label>
            <Input id="fullname" {...register("fullname")} />
            <p className="h-6 text-xs text-red-500">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="dpi">Número de Documento (DPI)</Label>
            <Input id="dpi" {...register("dpi")} />
            <p className="h-6 text-xs text-red-500">{errors.dpi?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="schedule">Horario de Entrada</Label>
            <Input id="schedule" {...register("schedule")} />
            <p className="h-6 text-xs text-red-500">
              {errors.schedule?.message}
            </p>
          </div>
          <div className="space-y-1 col-span-2">
            <Label htmlFor="position">Cargo o Puesto</Label>
            <Input
              id="position"
              {...register("position")}
              defaultValue="Piloto Recolector"
              disabled
            />
          </div>
          <div className="col-span-2 h-[53.6px] my-4 flex">
            {isSubmitting && <LoadingNotification />}
            {errorMessage && (
              <ErrorNotification message={errorMessage.message} />
            )}
          </div>
          <div className="col-span-2 flex gap-2">
            <Button
              variant="outline"
              className="border border-[#ea580c]"
              asChild
            >
              <Link href="/dashboard/empleados/pilotos">Regresar</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting && true}>
              Guardar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { CreateDriver };
