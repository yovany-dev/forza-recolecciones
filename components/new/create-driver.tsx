"use client";

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
import { useEffect } from "react";

interface Driver {
  employeeNumber: number;
  fullname: string;
  dpi: number;
  schedule: string;
  position: string;
}

const CreateDriver = () => {
  const driver: Driver = {
    employeeNumber: 111654,
    fullname: "Denilson Yovany Morales Chivalan",
    dpi: 123456789,
    position: "Piloto recolector",
    schedule: "07:30",
  };

  const addDriver = async () => {
    const res = await fetch("/api/driver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    addDriver();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Piloto</CardTitle>
        <CardDescription>
          Complete la información del nuevo piloto. Por favor, no deje campos
          vacíos.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="employeeNumber">No. Gafete</Label>
          <Input id="employeeNumber" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="fullname">Nombre Completo</Label>
          <Input id="fullname" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="dpi">Número de Documento (DPI)</Label>
          <Input id="dpi" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="schedule">Horario de Entrada</Label>
          <Input id="schedule" />
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="position">Cargo o Puesto</Label>
          <Input id="position" defaultValue="Piloto Recolector" disabled />
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

export { CreateDriver };
