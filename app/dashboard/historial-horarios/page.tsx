"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/common/header/header";
import { useRecordStore } from "@/lib/store/useRecordStore";
import { DataTable } from "@/app/dashboard/historial-horarios/data-table";
import { columns } from "@/app/dashboard/historial-horarios/columns";
import { useDebounce } from "use-debounce";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];
  const {
    reports,
    getReports,
    loading,
    setLoading,
    search,
    filters,
    dateRange,
    singleDate,
  } = useRecordStore();
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    getReports();
  }, [
    debouncedSearch,
    filters[0].values.length,
    filters[1].values.length,
    filters[2].values.length,
    filters[3].values.length,
    dateRange,
    singleDate,
  ]);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="historial-horarios" />
      <main className="n-content p-5">
        <Header
          title="Historial de Horarios"
          description="Obtén un historial detallado acerca del ingreso de los empleados, aplica búsquedas por día, semanas, y meses."
        />
        <div className="n-body mt-5">
          <DataTable columns={columns} data={reports} loading={loading} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
