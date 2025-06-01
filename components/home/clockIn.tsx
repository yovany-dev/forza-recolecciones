"use client";

import { useEffect } from "react";
import { ClockInHeader } from "@/components/home/clockInHeader";
import { ClockInForm } from "@/components/home/clockInForm";
import { ClockInMessage } from "@/components/home/clockInMessage";
import { useClockInStore } from "@/lib/store/useClockInStore";

interface Prop {
  fullname: string;
  uuid: string;
}
export function ClockIn({ fullname, uuid }: Prop) {
  const { getLocation } = useClockInStore();

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <ClockInHeader fullname={fullname} />
      <ClockInForm uuid={uuid} />
      <ClockInMessage />
    </div>
  );
}
