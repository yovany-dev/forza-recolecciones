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
import {
  LoadingNotification,
  successfulNotification,
} from "@/components/notifications";
import { Button } from "@/components/ui/button";
import { useReportStore } from "@/lib/store/useReportStore";
import { deleteReportService } from "@/services/reportService";
import { employeeSchemaType } from "@/lib/zod/employee";

interface Props {
  uuid: string;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const DialogDeleteReport: React.FC<Props> = ({ uuid, isOpen, setIsOpen }) => {
  const {
    removeReport,
    totalReports,
    setTotalReports,
    availableReports,
    setAvailableReports,
    getAvailableEmployee,
  } = useReportStore();
  const [loading, setLoading] = useState(false);

  const deleteEmployee = async () => {
    const reportRemoved = await deleteReportService(uuid);
    const employee: employeeSchemaType = reportRemoved.report;

    if (reportRemoved.status === 200) {
      successfulNotification(reportRemoved.message);
      removeReport(uuid);
      setTotalReports(totalReports - 1);

      const existEmployee = await getAvailableEmployee(employee);
      const availableEmployee: employeeSchemaType = {
        uuid: employee.uuid,
        employeeNumber: employee.employeeNumber,
        fullname: employee.fullname,
        dpi: employee.dpi,
        position: employee.position,
        schedule: employee.schedule,
      };
      setAvailableReports(
        existEmployee
          ? [...availableReports, availableEmployee]
          : [...availableReports]
      );
    } else {
      successfulNotification(reportRemoved.error);
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este reporte?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente el
            reporte de la base de datos.
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
              deleteEmployee();
            }}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DialogDeleteReport };
