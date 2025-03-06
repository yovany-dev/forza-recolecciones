import { Loader } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LoadingNotification = () => {
  return (
    <div className="flex items-center gap-1">
      <Loader className="animate-spin" />
      <p className="text-sm">Por favor espere...</p>
    </div>
  );
};

export const ErrorNotification = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>Número de gafete o DPI ya existe.</AlertDescription>
    </Alert>
  );
};

export const successfulNotification = () => {
  return toast("Piloto creado exitosamente.", {
    action: {
      label: "Aceptar",
      onClick: () => console.log("Aceptar"),
    },
  });
};
