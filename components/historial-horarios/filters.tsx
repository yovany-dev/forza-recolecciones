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
import { FilterType } from "@/types/reportType";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecordStore } from "@/lib/store/useRecordStore";
import { reportStatesConstant } from "@/lib/constants/report.constants";

interface FilterButtonProps {
  filter: FilterType;
}
const FilterButton: React.FC<FilterButtonProps> = ({ filter }) => {
  const { setFilters } = useRecordStore();
  return (
    <div className="relative flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-[150px]">
          <Button variant="ghost" size="sm" className="hover:bg-transparent">
            <span>{filter.title}</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filter.states.map((state, index) => (
            <DropdownMenuItem key={index}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={state}
                  checked={filter.values.includes(state)}
                  onCheckedChange={() =>
                    setFilters({
                      ...filter,
                      values: filter.values.includes(state)
                        ? filter.values.filter((v) => v !== state)
                        : [...filter.values, state],
                    })
                  }
                />
                <label
                  htmlFor={state}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {reportStatesConstant[state]}
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
          setFilters({ ...filter, values: [], active: false });
        }}
      >
        <X />
      </Button>
    </div>
  );
};

const FilterButtonClear = () => {
  const { filters, setFilters } = useRecordStore();
  const visibleFilters: boolean[] = [];
  filters.map((filter) => {
    if (filter.active || filter.values.length > 0) {
      visibleFilters.push(true);
    }
  });

  return visibleFilters.some((filter) => filter) ? (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        filters.map((filter) =>
          setFilters({ ...filter, values: [], active: false })
        );
      }}
    >
      <span>Limpiar Todo</span>
      <X />
    </Button>
  ) : (
    ""
  );
};

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useRecordStore();
  const filterValues = filters.map((f) => f.values);

  useEffect(() => {
    filters.forEach((filter) => {
      const filterParams =
        searchParams.get(`fr_${filter.title.toLowerCase()}`)?.split(",") || [];
      setFilters({
        ...filter,
        values: filterParams,
        active: filterParams.length > 0,
      });
    });
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    filters.forEach((filter) => {
      if (filter.values.length > 0) {
        params.set(`fr_${filter.title.toLowerCase()}`, filter.values.join(","));
      } else {
        params.delete(`fr_${filter.title.toLowerCase()}`);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [...filterValues]);

  return (
    <div className="w-full flex justify-between my-2">
      <div className="flex gap-2">
        {filters.map((filter, index) =>
          filter.active || filter.values.length > 0 ? (
            <FilterButton key={index} filter={filter} />
          ) : (
            ""
          )
        )}
      </div>
      <FilterButtonClear />
    </div>
  );
};

export { Filters };
