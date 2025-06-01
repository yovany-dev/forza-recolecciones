import { getLocalReport } from "@/lib/localStorage";
import { formatTime } from "@/lib/utils";
import { Calendar, IdCard, Clock } from "lucide-react";

const Report = () => {
  const report = getLocalReport();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 p-4 rounded-md font-medium border border-input bg-background">
        <div className="flex items-center gap-2">
          <IdCard className="w-5 h-5" />
          <span className="truncate">Entrada de: {report?.fullname}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span className="">Fecha de entrada: {report?.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="">
            Hora de entrada: {formatTime(report?.checkIn as string)}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Report };
