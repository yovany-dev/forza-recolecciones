"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginClockInSchema, loginClockInSchemaType } from "@/lib/zod/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoFD } from "@/components/home/logoFD";

export function LoginHome() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<loginClockInSchemaType>({
    resolver: zodResolver(loginClockInSchema),
    defaultValues: {
      identity: "",
    },
  });

  const onSubmit: SubmitHandler<loginClockInSchemaType> = async (data) => {
    const res = await fetch("/api/auth/clockIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.status === 200) {
      router.refresh();
    } else if (result.status === 401) {
      setError(result.error);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="identity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de gafete o (DPI)</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Ingrese su número de gafete o DPI"
                    {...field}
                  />
                </FormControl>
                  <FormMessage />
                  {error && (
                    <div className="px-3 py-2 text-sm rounded-md border border-[#dc2626] text-[#dc2626]">
                      <p>{error}</p>
                    </div>
                  )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground">
        Esta aplicación requiere que tenga activada su ubicación para poder
        funcionar correctamente.
      </div>
    </div>
  );
}
