"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoForzaDeliveryWhite from "@/public/logo-forza-delivery-white.svg";
import LogoForzaDeliveryBlack from "@/public/logo-forza-delivery-black.svg";

export function LoginHome() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-6">
      <form>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <Image
              src={
                theme == "light"
                  ? LogoForzaDeliveryBlack
                  : LogoForzaDeliveryWhite
              }
              alt="Logo Forza Delivery Express"
              width={250}
            />
            <span className="text-xl font-semibold text-[#ea5d1d]">
              Control Horario Recos
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="text">Número de gafete o (DPI)</Label>
              <Input
                id="text"
                type="text"
                className="text-sm"
                placeholder="Ingrese su número de gafete o DPI"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
