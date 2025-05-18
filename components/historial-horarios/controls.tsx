import { Table } from "@tanstack/react-table";
import { InputTable } from "@/components/historial-horarios/inputTable";
import { DateRangeSelector } from "@/components/historial-horarios/dateRangeSelector";
import { ColumnsTable } from "@/components/historial-horarios/columnsTable";
import { FiltersTable } from "@/components/historial-horarios/filtersTable";
import { ButtonCalendar } from "@/components/historial-horarios/buttonCalendar";

interface Props<TData> {
  table: Table<TData>;
}
const Controls = <TData,>({ table }: Props<TData>) => {
  return (
    <div className="flex justify-between">
      <InputTable />
      <div className="flex gap-2">
        <DateRangeSelector />
        <ColumnsTable table={table} />
        <FiltersTable />
        <ButtonCalendar />
      </div>
    </div>
  );
};

export { Controls };
