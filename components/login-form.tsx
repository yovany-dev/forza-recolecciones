"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import LogoForzaDeliveryWhite from "@/public/logo-forza-delivery-white.svg";
import LogoForzaDeliveryBlack from "@/public/logo-forza-delivery-black.svg";
import { loginSchema, loginSchemaType } from "@/lib/zod/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<loginSchemaType> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader className="flex flex-col gap-5 items-center">
          <Image
            src={
              theme == "light" ? LogoForzaDeliveryBlack : LogoForzaDeliveryWhite
            }
            alt="Logo Forza Delivery Express"
            width={250}
          />
          <p className="tracking-tight text-base sm:text-xl">
            {/* Ingresar a{" "} */}
            <span className="font-semibold text-[#ea5d1d]">
              Control Horario Recos
            </span>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@forzadelivery.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {error && (
                  <div className="bg-red-500 px-3 py-2 text-sm rounded-md">
                    <p>{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Iniciar sesion
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
