"use client";

import { useEffect } from "react";
import { LogoFD } from "@/components/home/logoFD";
import { ClockInHeader } from "@/components/home/clockInHeader";
import { ClockInForm } from "@/components/home/clockInForm";
import { useClockInStore } from "@/lib/store/useClockInStore";

interface Prop {
  fullname: string;
}
export function ClockIn({ fullname }: Prop) {
  const { getLocation } = useClockInStore();

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      <ClockInHeader fullname={fullname} />
      <ClockInForm />
    </div>
  );
}
