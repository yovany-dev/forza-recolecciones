"use client";

import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  reportSchema,
  reportSchemaType,
  updateReportSchemaType,
} from "@/lib/zod/report";
import { EmployeeType } from "@/types/employeeType";
import { useReportStore } from "@/lib/store/useReportStore";
import { updateReportService } from "@/services/reportService";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LoadingNotification,
  successfulNotification,
  ErrorNotification,
} from "@/components/notifications";

const reportType: Record<string, EmployeeType> = {
  "PILOTO RECOLECTOR": "driver",
  "AUXILIAR RECOLECTOR": "copilot",
};

interface Props {
  report: reportSchemaType;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const SheetEditReport: React.FC<Props> = ({ report, isOpen, setIsOpen }) => {
  const { updateReport } = useReportStore();
  const [messageError, setMessageError] = useState<string | null>(null);
  const form = useForm<reportSchemaType>({
    resolver: zodResolver(reportSchema),
    defaultValues: report,
  });

  const onSubmit: SubmitHandler<reportSchemaType> = async (data) => {
    setMessageError(null);
    const dataSend: updateReportSchemaType = {
      type: reportType[data.position],
      uuid: data.uuid as string,
      dpi: data.dpi,
      checkIn: data.checkIn,
      location: data.location,
      photo: data.photo,
      state: data.state,
    };
    const res = await updateReportService(dataSend);

    if (res.status === 200) {
      setIsOpen(false);
      updateReport(data.uuid, res.report);
      successfulNotification("Reporte actualizado exitosamente.");
    } else {
      setMessageError("No se pudo actualizar el reporte.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Reporte</SheetTitle>
          <SheetDescription>
            Realice los cambios del reporte aquí. Haga clic en guardar cuando
            haya terminado.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="py-4 flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre Completo" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora de Entrada</FormLabel>
                  <FormControl>
                    <Input placeholder="Hora de Entrada" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado para mostrar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="DETECTADA">DETECTADA</SelectItem>
                      <SelectItem value="NO_DETECTADA">NO DETECTADA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotografía</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado para mostrar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="CARGADA">CARGADA</SelectItem>
                      <SelectItem value="NO_CARGADA">NO CARGADA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado para mostrar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="INGRESADO">INGRESADO</SelectItem>
                      <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                      <SelectItem value="INGRESO_TARDE">
                        INGRESO TARDE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-[53.6px] my-2 flex">
              {form.formState.isSubmitting && <LoadingNotification />}
              {messageError && <ErrorNotification message={messageError} />}
            </div>
            <Button
              type="submit"
              className="w-min self-end"
              disabled={form.formState.isSubmitting}
            >
              Guardar Cambios
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export { SheetEditReport };
