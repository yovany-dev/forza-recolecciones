"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface Props {
  timeFilter: boolean;
  setTimeFilter: (data: boolean) => void;
}
const Filters: React.FC<Props> = ({ timeFilter, setTimeFilter }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  return timeFilter ? (
    <div className="w-full flex justify-between my-2">
      <div className="flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-transparent"
          onClick={() => setDropdown(true)}
        >
          <span>Horario</span>
          <ChevronDown />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-transparent"
          onClick={() => setTimeFilter(false)}
        >
          <X />
        </Button>
      </div>
      <DropdownMenu open={dropdown} onOpenChange={setTimeFilter}>
        <DropdownMenuContent>
          <DropdownMenuLabel>Horarios</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            07:30
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            08:30
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
