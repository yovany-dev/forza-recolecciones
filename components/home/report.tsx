import { Calendar, IdCard, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

const Report = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 p-4 rounded-md font-medium border border-input bg-background">
        <div className="flex items-center gap-2">
          <IdCard className="w-5 h-5" />
          <span className="truncate">
            Entrada de: Denilson Yovani Morales Chivalan
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span className="">Fecha de entrada: {formatDate(new Date())}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="">Hora de entrada: 07:21 AM</span>
        </div>
      </div>
    </div>
  );
};

export { Report };
