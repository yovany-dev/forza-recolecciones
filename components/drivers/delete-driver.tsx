import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDriverAPI } from "@/lib/delete-driver";
import { successfulNotification } from "../notifications";
import { useDriverStore } from "@/lib/store/useDriverStore";

interface Props {
  uuid: string | undefined;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}
const DialogDeleteDriver: React.FC<Props> = ({ uuid, isOpen, setIsOpen }) => {
  const { removeDriver } = useDriverStore();
  const deleteDriver = async (uuid: string | undefined) => {
    const driverRemoved = await deleteDriverAPI(uuid);
    if (driverRemoved.status === 200) {
      successfulNotification(driverRemoved.message);
      removeDriver(uuid);
    } else {
      successfulNotification(driverRemoved.error);
    }
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
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteDriver(uuid)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DialogDeleteDriver };
