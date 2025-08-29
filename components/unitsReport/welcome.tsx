import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Prop {
  fullname: string;
}
const Welcome: React.FC<Prop> = ({ fullname }) => {
  return (
    <Alert className="p-0 overflow-hidden">
      <div className="w-full h-[5px] bg-[#ea5d1d]"></div>
      <div className="p-4 flex gap-3">
        <div>
          <CircleAlertIcon />
        </div>
        <div className="flex flex-col gap-2">
          <AlertTitle className="font-semibold">
            ¡Hola {fullname.toUpperCase()}!
          </AlertTitle>
          <AlertDescription className="text-[#a8a29e]">
            Responde todas las preguntas correctamente. Procura no dejar campos
            vacío.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export { Welcome };
