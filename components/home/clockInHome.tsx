"use client";

import { LogoFD } from "@/components/home/logoFD";
import { ClockIn } from "@/components/home/clockIn";
import { Report } from "@/components/home/report";

import { getLocalReport } from "@/lib/localStorage";
import { useClockInStore } from "@/lib/store/useClockInStore";

interface Prop {
  fullname: string;
  uuid: string;
}
const ClockInHome: React.FC<Prop> = ({ fullname, uuid }) => {
  const report = getLocalReport();
  const { joined } = useClockInStore();
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      {report || joined ? <Report /> : <ClockIn fullname={fullname} uuid={uuid} />}
    </div>
  );
};

export { ClockInHome };
