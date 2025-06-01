import { Info } from "lucide-react";
import { useClockInStore } from "@/lib/store/useClockInStore";

const ClockInMessage = () => {
  const { message, loading } = useClockInStore();
  return message && !loading? (
    <div className="relative -top-5 flex items-center gap-2 h-10 px-4 py-2 rounded-md font-medium bg-background border border-[#ffc000] text-[#ffc000]">
      <Info className="w-5 h-5" />
      <span className="text-sm">{message}</span>
    </div>
  ) : (
    ""
  );
};

export { ClockInMessage };
