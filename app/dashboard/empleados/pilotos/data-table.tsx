"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaginationType } from "@/types/paginationType";
import { TableSkeleton } from "@/components/drivers/table-skeleton";
import { Controls } from "@/components/drivers/controls";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | null;
  loading: boolean;
  paginationData: PaginationType;
  setPaginationData: (data: PaginationType) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  paginationData,
  setPaginationData,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div>
      <Controls table={table} />
      <Separator className="my-4" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton />
            ) : data && data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionado.
        </div>
        <div className="">
          <p className="text-sm text-muted-foreground">
            total de pilotos {paginationData.total}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPaginationData({
                ...paginationData,
                page: Math.max(paginationData.page - 1, 1),
              })
            }
            disabled={paginationData.page == 1}
          >
            Anterior
          </Button>
          <p className="text-sm text-muted-foreground">
            {paginationData.page} de {paginationData.total_pages}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPaginationData({
                ...paginationData,
                page: Math.min(
                  paginationData.page + 1,
                  paginationData.total_pages
                ),
              })
            }
            disabled={
              data == null || paginationData.page == paginationData.total_pages
            }
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
