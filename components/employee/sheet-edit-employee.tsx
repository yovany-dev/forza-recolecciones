import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { EmployeeType } from "@/types/employeeType";
import { employeeSchema, employeeSchemaType } from "@/lib/zod/employee";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoadingNotification,
  successfulNotification,
  ErrorNotification,
} from "@/components/notifications";
import { updateEmployeeService } from "@/services/employeeService";
import { useEmployeeStore } from "@/lib/store/useEmployeeStore";

const formattedType: Record<string, string> = {
  driver: "Piloto",
  copilot: "Auxiliar",
};
interface errorMessage {
  status: boolean;
  message: string;
}
interface Props {
  employee: employeeSchemaType;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const SheetEditEmployee: React.FC<Props> = ({ employee, isOpen, setIsOpen }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<employeeSchemaType>({ resolver: zodResolver(employeeSchema) });
  const [errorMessage, setErrorMessage] = useState<null | errorMessage>(null);
  const { employeeType, updateEmployee } = useEmployeeStore();

  const onSubmit: SubmitHandler<employeeSchemaType> = async (data) => {
    setErrorMessage(null);
    const resUpdateEmployee = await updateEmployeeService(employeeType as EmployeeType, {
      ...data,
      uuid: employee.uuid,
    });

    if (resUpdateEmployee.status == 200) {
      setIsOpen(false);
      updateEmployee(employee.uuid, resUpdateEmployee[employeeType]);
      successfulNotification(`${formattedType[employeeType]} actualizado exitosamente.`);
    } else if (resUpdateEmployee.status == 409) {
      setErrorMessage({
        status: true,
        message: resUpdateEmployee.errorMessage,
      });
    } else {
      setErrorMessage({
        status: true,
        message: `Error el ${formattedType[employeeType]} no se pudo actualizar.`,
      });
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
          <SheetTitle>Editar {formattedType[employeeType].toLowerCase()}</SheetTitle>
          <SheetDescription>
            Realice los cambios del {formattedType[employeeType].toLowerCase()} aquí. Haga clic en guardar cuando
            haya terminado.
          </SheetDescription>
        </SheetHeader>
        <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <Label htmlFor="employeeNumber">No. Gafete</Label>
            <Input
              id="employeeNumber"
              {...register("employeeNumber")}
              defaultValue={employee.employeeNumber}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.employeeNumber?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="fullname">Nombre Completo</Label>
            <Input
              id="fullname"
              {...register("fullname")}
              defaultValue={employee.fullname}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="dpi">Número de Documento (DPI)</Label>
            <Input id="dpi" {...register("dpi")} defaultValue={employee.dpi} />
            <p className="h-6 text-xs text-red-500">{errors.dpi?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="schedule">Horario de Entrada</Label>
            <Input
              id="schedule"
              {...register("schedule")}
              defaultValue={employee.schedule}
            />
            <p className="h-6 text-xs text-red-500">
              {errors.schedule?.message}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="position">Cargo o Puesto</Label>
            <Input
              id="position"
              {...register("position")}
              defaultValue={`${formattedType[employeeType].toUpperCase()} RECOLECTOR`}
              disabled
            />
          </div>
          <div className="h-[53.6px] my-4 flex">
            {isSubmitting && <LoadingNotification />}
            {errorMessage && (
              <ErrorNotification message={errorMessage.message} />
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting && true}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { SheetEditEmployee };
