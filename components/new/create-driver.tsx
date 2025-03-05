"use client";

import { CircleCheck } from "lucide-react";
import { AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { driverSchema, driverSchemaType } from "@/lib/zod/driver";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const alertMessage = (success: boolean, message: string) => {
  return (
    <Alert className="text-green-400 border-green-400">
      {success ? (
        <CircleCheck className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
};

const CreateDriver = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<driverSchemaType>({ resolver: zodResolver(driverSchema) });

  const onSubmit: SubmitHandler<driverSchemaType> = async (data) => {
    const res = await fetch("/api/driver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const driver = await res.json();
    if (driver.status == 201) {
      console.log("Piloto creado exitosamente.");
    } else if (driver.status == 409) {
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
            {/* {errors.employeeNumber && (
              <p className="text-xs text-red-500">
                {errors.employeeNumber.message}
              </p>
            )} */}
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
          <div className="col-span-2">
            {/* <Alert className="text-green-400 border-green-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert> */}
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
