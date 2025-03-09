import React from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LoadingNotification = () => {
  return (
    <div className="flex items-center gap-1">
      <Loader className="animate-spin" />
      <p className="text-sm">Por favor espere...</p>
    </div>
  );
};

interface Props {
  message: string;
}
export const ErrorNotification: React.FC<Props> = ({ message }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export const successfulNotification = (message: string) => {
  return toast(message, {
    action: {
      label: "Aceptar",
      onClick: () => console.log("Aceptar"),
    },
    actionButtonStyle: {
      color: '#fff',
      background: '#ea580c'
    }
  });
};
