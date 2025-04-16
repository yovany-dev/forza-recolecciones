import { Table } from "@tanstack/react-table";
import { InputTable } from "@/components/report/inputTable";
import { ColumnsTable } from "@/components/report/columnsTable";
import { FiltersTable } from "@/components/report/filtersTable";
import { ComboboxNewReport } from "@/components/report/comboboxTable";

interface Props<TData> {
  table: Table<TData>;
}
const Controls = <TData,>({ table }: Props<TData>) => {
  return (
    <div className="flex justify-between">
      <InputTable />
      <div className="flex gap-2">
        <ColumnsTable table={table} />
        <FiltersTable />
        <ComboboxNewReport />
      </div>
    </div>
  );
};

export { Controls };
