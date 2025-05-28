"use client";

import { LogoFD } from "@/components/home/logoFD";
import { ClockInHeader } from "@/components/home/clockInHeader";
import { ClockInForm } from "@/components/home/clockInForm";

interface Prop {
  fullname: string;
}
export function ClockIn({ fullname }: Prop) {
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      <ClockInHeader fullname={fullname} />
      <ClockInForm />
    </div>
  );
}
