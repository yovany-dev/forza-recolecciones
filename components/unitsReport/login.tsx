"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  loginUnitsReportSchema,
  loginUnitsReportSchemaType,
} from "@/lib/zod/auth";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoFD } from "@/components/unitsReport/logoFD";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<loginUnitsReportSchemaType>({
    resolver: zodResolver(loginUnitsReportSchema),
    defaultValues: {
      identity: "",
    },
  });

  const onSubmit: SubmitHandler<loginUnitsReportSchemaType> = async (data) => {
    const res = await fetch("/api/auth/unitsReport", {
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
                <FormLabel>Número de gafete</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={0} className="w-full" />
                      <InputOTPSlot index={1} className="w-full" />
                      <InputOTPSlot index={2} className="w-full" />
                      <InputOTPSlot index={3} className="w-full" />
                      <InputOTPSlot index={4} className="w-full" />
                      <InputOTPSlot index={5} className="w-full" />
                    </InputOTPGroup>
                  </InputOTP>
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
    </div>
  );
}
