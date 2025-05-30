import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useClock } from "@/lib/hooks/useClock";
import { useClockInStore } from "@/lib/store/useClockInStore";
import { Calendar, IdCard, MapPinCheck, MapPinX } from "lucide-react";

interface Prop {
  fullname: string;
}
const LocationStates = () => {
  const { coordinatesStates } = useClockInStore();
  const { status, message } = coordinatesStates;
  return (
    <div
      className={cn(
        status === null
          ? "border-secondary"
          : status
          ? "text-[#37b400] border-[#37b400]"
          : "text-[#dc2626] border-[#dc2626]",
        "flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium bg-background border"
      )}
    >
      {status === null ? (
        <Loader className="animate-spin" />
      ) : status ? (
        <MapPinCheck />
      ) : (
        <MapPinX />
      )}
      {status === null ? (
        <span>Detectando ubicación...</span>
      ) : (
        <span className="text-sm">{message}</span>
      )}
    </div>
  );
};

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
        <span className="truncate">{fullname}</span>
      </div>
      <LocationStates />
    </div>
  );
};

export { ClockInHeader };
