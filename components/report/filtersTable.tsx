import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useReportStore } from "@/lib/store/useReportStore";

const FiltersTable = () => {
  const { filters, setFilters } = useReportStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ListFilter />
          <span>Filtros</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filters.map((filter, index) => (
          <DropdownMenuItem key={index}>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={filter.title}
                checked={filter.active || filter.values.length > 0}
                onClick={() => {
                  setFilters({
                    ...filter,
                    active: !filter.active,
                    values: filter.active ? [] : [...filter.values],
                  });
                }}
              />
              <label
                htmlFor={filter.title}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {filter.title}
              </label>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { FiltersTable };
