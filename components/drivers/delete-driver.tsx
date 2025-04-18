import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteDriverService } from "@/services/driverService";
import {
  LoadingNotification,
  successfulNotification,
} from "@/components/notifications";
import { useDriverStore } from "@/lib/store/useDriverStore";
import { Button } from "@/components/ui/button";

interface Props {
  uuid: string | undefined;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const DialogDeleteDriver: React.FC<Props> = ({ uuid, isOpen, setIsOpen }) => {
  const { removeDriver } = useDriverStore();
  const [loading, setLoading] = useState(false);
  const deleteDriver = async (uuid: string | undefined) => {
    const driverRemoved = await deleteDriverService(uuid);
    if (driverRemoved.status === 200) {
      successfulNotification(driverRemoved.message);
      removeDriver(uuid);
    } else {
      successfulNotification(driverRemoved.error);
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este piloto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente al
            piloto de la base de datos.
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
              deleteDriver(uuid);
            }}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DialogDeleteDriver };
