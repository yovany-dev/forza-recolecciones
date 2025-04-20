"use client";

import * as React from "react";
import { ChevronsUpDown, Grid2X2Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useReportStore } from "@/lib/store/useReportStore";

export function ComboboxNewReport() {
  const { availableReports, createReport } = useReportStore();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const employees = availableReports.map((employee) => {
    return {
      dpi: employee.dpi,
      position: employee.position,
      value: employee.fullname,
      label: employee.fullname,
    };
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <Grid2X2Plus />
          Nuevo Reporte
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar empleado..." />
          <CommandList>
            <CommandEmpty>No encontrado.</CommandEmpty>
            <CommandGroup>
              {employees.map((employee) => (
                <CommandItem
                  key={employee.value}
                  value={employee.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      createReport(employee.dpi, employee.position);
                    }
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Checkbox checked={value == employee.value} aria-label="" />
                  {employee.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
