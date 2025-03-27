"use client";

import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useDriverStore } from "@/lib/store/useDriverStore";
import { useRouter, useSearchParams } from "next/navigation";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const Filters = () => {
  const { filter, setFilter, filterTime, setFilterTime } = useDriverStore();
  const [firstSchedule, setFirstSchedule] = useState<Checked>(false);
  const [secondSchedule, setSecondSchedule] = useState<Checked>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // setSearch(searchParams.get("search") || "");
    setFilterTime(filterTime.cheked, searchParams.get("fr_horario") || "");
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filterTime.value) {
      params.set("fr_horario", filterTime.value);
    } else {
      params.delete("fr_horario");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filterTime.value]);

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
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="firstSchedule"
                  checked={filterTime.cheked}
                  onClick={() => setFilterTime(!filterTime.cheked, "07:30")}
                />
                <label
                  htmlFor="firstSchedule"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  07:30
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="secondSchedule"
                  checked={secondSchedule}
                  onCheckedChange={setSecondSchedule}
                />
                <label
                  htmlFor="secondSchedule"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  08:30
                </label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 hover:bg-transparent"
          onClick={() => setFilter(false)}
        >
          <X />
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#0c0a09]"
        onClick={() => setFilter(false)}
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
