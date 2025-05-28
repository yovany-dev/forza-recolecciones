"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useClock } from "@/lib/hooks/useClock";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, IdCard, MapPinX } from "lucide-react";
import LogoForzaDeliveryWhite from "@/public/logo-forza-delivery-white.svg";
import LogoForzaDeliveryBlack from "@/public/logo-forza-delivery-black.svg";

interface Prop {
  fullname: string;
}
export function ClockIn({ fullname }: Prop) {
  const { theme } = useTheme();
  const currentTime = useClock();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 items-center">
        <Image
          src={
            theme == "light" ? LogoForzaDeliveryBlack : LogoForzaDeliveryWhite
          }
          alt="Logo Forza Delivery Express"
          width={250}
        />
        <span className="text-xl font-semibold text-[#ea5d1d]">
          Control Horario Recos
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium border border-input bg-background">
          <Calendar className="w-5 h-5" />
          <span>{currentTime}</span>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium border border-input bg-background">
          <IdCard className="w-5 h-5" />
          <span>{fullname}</span>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium text-[#7f1d1d] border border-[#7f1d1d] bg-background">
          <MapPinX className="w-5 h-5" />
          <span>Ubicación no detectada</span>
        </div>
      </div>
      <form className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="file">Insertar fotografía</Label>
          <p className="text-[12px] text-muted-foreground">
            Tome una foto del establecimiento como prueba de su ingreso
          </p>
          <Input id="file" type="file" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="file">Permitir ubicación</Label>
          <p className="text-[12px] text-muted-foreground">
            Active la ubicación de su dispositivo para poder marcar su horario
          </p>
          <Button variant="secondary">Activar la ubicación</Button>
        </div>
        <Button type="submit" className="w-full" disabled>
          Marcar Horario
        </Button>
      </form>
    </div>
  );
}
