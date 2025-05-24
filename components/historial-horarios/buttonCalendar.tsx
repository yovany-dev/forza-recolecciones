"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRecordStore } from "@/lib/store/useRecordStore";

const ButtonCalendar = () => {
  const { singleDate, setSingleDate, setSelectedPeriod, setDateRange } =
    useRecordStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="w-[200px]">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Abrir Calendario</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={es}
          mode="single"
          selected={singleDate}
          onSelect={(date) => {
            setSelectedPeriod("");
            setDateRange(undefined);
            setSingleDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { ButtonCalendar };
