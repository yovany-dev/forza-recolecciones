import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteEmployeeService } from "@/services/employeeService";
import {
  LoadingNotification,
  successfulNotification,
} from "@/components/notifications";
import { useEmployeeStore } from "@/lib/store/useEmployeeStore";
import { Button } from "@/components/ui/button";
import { EmployeeType } from "@/types/employeeType";

const formattedType: Record<string, string> = {
  driver: "Piloto",
  copilot: "Auxiliar",
};
interface Props {
  uuid: string | undefined;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const DialogDeleteEmployee: React.FC<Props> = ({ uuid, isOpen, setIsOpen }) => {
  const { employeeType, removeEmployee, pagination, setPagination } =
    useEmployeeStore();
  const [loading, setLoading] = useState(false);
  const deleteEmployee = async (uuid: string | undefined) => {
    const employeeRemoved = await deleteEmployeeService(
      employeeType as EmployeeType,
      uuid
    );
    if (employeeRemoved.status === 200) {
      successfulNotification(employeeRemoved.message);
      removeEmployee(uuid);
      setPagination({
        ...pagination,
        total: pagination.total - 1,
        total_pages:
          pagination.total_pages !== 1 ? pagination.total_pages - 1 : 1,
      });
    } else {
      successfulNotification(employeeRemoved.error);
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este{" "}
            {formattedType[employeeType].toLowerCase()}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente al
            {" " + formattedType[employeeType].toLowerCase()} de la base de
            datos.
          </AlertDialogDescription>
          <div className="h-6">{loading && <LoadingNotification />}</div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={() => {
              setLoading(true);
              deleteEmployee(uuid);
            }}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DialogDeleteEmployee };
