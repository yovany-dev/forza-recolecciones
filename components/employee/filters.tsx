"use client";

import { X } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmployeeStore } from "@/lib/store/useEmployeeStore";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const {
    filter,
    // setFilter,
    availableTimes,
    selectedTimes,
    setSelectedTimes,
    initialSchedules,
    clearFilterTime,
  } = useEmployeeStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const schedulesParams = searchParams.get("fr_horario")?.split(",") || [];
    initialSchedules(schedulesParams);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedTimes.length > 0) {
      params.set("fr_horario", selectedTimes.join(","));
    } else {
      params.delete("fr_horario");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedTimes]);

  return filter ? (
    <div className="w-full flex justify-between my-2">
      <div className="relative flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-[150px]">
            <Button variant="ghost" size="sm" className="hover:bg-transparent">
              <span>Horario</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableTimes.map((hour, index) => (
              <DropdownMenuItem key={index}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={hour}
                    checked={selectedTimes.includes(hour)}
                    onCheckedChange={() => setSelectedTimes(hour)}
                  />
                  <label
                    htmlFor={hour}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {hour}
                  </label>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 hover:bg-transparent"
          onClick={() => {
            clearFilterTime();
          }}
        >
          <X />
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          clearFilterTime();
        }}
      >
        <span>Limpiar Todo</span>
        <X />
      </Button>
    </div>
  ) : (
    <div className="py-2"></div>
  );
};

export { Filters };
