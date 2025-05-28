import React from "react";
import { useClock } from "@/lib/hooks/useClock";
import { Calendar, IdCard, MapPinX } from "lucide-react";

interface Prop {
  fullname: string;
}
const ClockInHeader: React.FC<Prop> = ({ fullname }) => {
  const currentTime = useClock();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium border border-input bg-background">
        <Calendar className="w-5 h-5" />
        <span>{currentTime}</span>
      </div>
      <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium border border-input bg-background">
        <IdCard className="w-5 h-5" />
        <span>{fullname}</span>
      </div>
      <div className="flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium text-[#dc2626] border border-[#dc2626] bg-background">
        <MapPinX className="w-5 h-5" />
        <span>Ubicación no detectada</span>
      </div>
    </div>
  );
};

export { ClockInHeader };
