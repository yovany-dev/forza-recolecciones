"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown, Clock4 } from "lucide-react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { useRecordStore } from "@/lib/store/useRecordStore";

const DateRangeSelector = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    setSingleDate,
    periods,
    ranges,
  } = useRecordStore();
  const [openCombo, setOpenCombo] = useState(false);

  return (
    <div className="flex items-center">
      <Popover open={openCombo} onOpenChange={setOpenCombo}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "w-[200px] flex justify-between rounded-r-none",
              !selectedPeriod && "text-muted-foreground"
            )}
            role="combobox"
            aria-expanded={openCombo}
          >
            <div className="flex items-center gap-2">
              <Clock4 className="w-4 h-4" />
              {selectedPeriod ? selectedPeriod : "Seleccionar periodo"}
            </div>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              {periods.map((period) => (
                <CommandItem
                  key={period}
                  onSelect={() => {
                    setSingleDate(undefined);
                    setDateRange(ranges[period]);
                    setSelectedPeriod(period);
                    setOpenCombo(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    period === selectedPeriod && "bg-muted"
                  )}
                >
                  {period}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size="sm"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal rounded-l-none",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "d 'de' LLLL, yyyy", { locale: es })}{" "}
                  - {format(dateRange.to, "d 'de' LLLL, yyyy", { locale: es })}
                </>
              ) : (
                format(dateRange.from, "d 'de' LLLL, yyyy", { locale: es })
              )
            ) : (
              <span>Seleccionar rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={es}
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(date) => {
              setSelectedPeriod("");
              setSingleDate(undefined);
              setDateRange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DateRangeSelector };
