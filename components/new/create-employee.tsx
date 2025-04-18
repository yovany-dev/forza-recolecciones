"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LoadingNotification,
  successfulNotification,
  ErrorNotification,
} from "@/components/notifications";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React, { useState } from "react";
import { EmployeeType } from "@/types/employeeType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { employeeSchema, employeeSchemaType } from "@/lib/zod/employee";
import { createEmployeeService } from "@/services/employeeService";

const formattedType: Record<string, EmployeeType> = {
  piloto: "driver",
  auxiliar: "copilot",
};
interface errorMessage {
  status: boolean;
  message: string;
}
interface Props {
  type: string;
}
const CreateEmployee: React.FC<Props> = ({ type }) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<employeeSchemaType>({ resolver: zodResolver(employeeSchema) });
  const [errorMessage, setErrorMessage] = useState<null | errorMessage>(null);

  const onSubmit: SubmitHandler<employeeSchemaType> = async (data) => {
    setErrorMessage(null);
    const employee = await createEmployeeService(
      formattedType[type.toLowerCase()],
      data
    );

    if (employee.status == 201) {
      reset();
      successfulNotification(`${type} creado exitosamente.`);
    } else if (employee.status == 409) {
      setErrorMessage({
        status: true,
        message: "Número de gafete o DPI ya existen.",
      });
    } else {
      setErrorMessage({
        status: true,
        message: `Error el ${type.toLowerCase()} no se pudo crear.`,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>
          Complete la información del nuevo {type.toLowerCase()}. Por favor, no
          deje campos vacíos.
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
              defaultValue={`${type} Recolector`}
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

export { CreateEmployee };
