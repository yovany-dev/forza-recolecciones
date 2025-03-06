"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { driverSchema, driverSchemaType } from "@/lib/zod/driver";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingNotification } from "@/components/notifications";
import { successfulNotification } from "@/components/notifications";
import { ErrorNotification } from "@/components/notifications";

const CreateDriver = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<driverSchemaType>({ resolver: zodResolver(driverSchema) });
  const [loading, setLoading] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState<null | boolean>(null);

  const onSubmit: SubmitHandler<driverSchemaType> = async (data) => {
    setLoading(true);
    const res = await fetch("/api/driver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const driver = await res.json();

    setErrorMessage(false);
    setLoading(false);
    if (driver.status == 201) {
      successfulNotification();
    } else if (driver.status == 409) {
      setErrorMessage(true);
      console.log(driver.errorMessage);
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
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1">
            <Label htmlFor="employeeNumber">No. Gafete</Label>
            <Input id="employeeNumber" {...register("employeeNumber")} />
            <p className="text-xs text-red-500">
              {errors.employeeNumber?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="fullname">Nombre Completo</Label>
            <Input id="fullname" {...register("fullname")} />
            <p className="text-xs text-red-500">{errors.fullname?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="dpi">Número de Documento (DPI)</Label>
            <Input id="dpi" {...register("dpi")} />
            <p className="text-xs text-red-500">{errors.dpi?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="schedule">Horario de Entrada</Label>
            <Input id="schedule" {...register("schedule")} />
            <p className="text-xs text-red-500">{errors.schedule?.message}</p>
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
          <div className="col-span-2 h-[53.6px] flex">
            {loading && <LoadingNotification />}
            {errorMessage && <ErrorNotification />}
          </div>
          <div className="col-span-2 flex gap-2">
            <Button variant="outline" className="border border-[#ea580c]">
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { CreateDriver };
