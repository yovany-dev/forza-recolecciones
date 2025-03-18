"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface Props {
  timeFilter: boolean;
  setTimeFilter: (data: boolean) => void;
}
const Filters: React.FC<Props> = ({ timeFilter, setTimeFilter }) => {
  const [first, setFirst] = useState<Checked>(false);
  return timeFilter ? (
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
                  id="checkInFirst"
                  checked={first}
                  onCheckedChange={setFirst}
                />
                <label
                  htmlFor="checkInFirst"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  07:30
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkInSecound" />
                <label
                  htmlFor="checkInSecound"
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
          onClick={() => setTimeFilter(false)}
        >
          <X />
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#0c0a09]"
        onClick={() => setTimeFilter(false)}
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
