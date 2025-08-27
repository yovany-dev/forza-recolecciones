import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Prop {
  fullname: string;
}
const Welcome: React.FC<Prop> = ({ fullname }) => {
  return (
    <Alert className="flex flex-col gap-3">
      <CircleAlertIcon />
      <AlertTitle className="font-semibold">
        ¡HOLA {fullname.toUpperCase()}!
      </AlertTitle>
      <AlertDescription className="text-[#a8a29e]">
        Responde todas las preguntas correctamente. Procura no dejar campos
        vacío.
      </AlertDescription>
    </Alert>
  );
};

export { Welcome };
