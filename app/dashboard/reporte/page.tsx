"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/common/header/header";
import { useReportStore } from "@/lib/store/useReportStore";
import { DataTable } from "@/app/dashboard/reporte/data-table";
import { columns } from "@/app/dashboard/reporte/columns";
import { useDebounce } from "use-debounce";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];
  const {
    reports,
    totalReports,
    getReports,
    loading,
    setLoading,
    search,
    filters,
    // setAvailableReportLoading,
  } = useReportStore();
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    // setAvailableReportLoading(true);
    getReports();
  }, [
    debouncedSearch,
    filters[0].values.length,
    filters[1].values.length,
    filters[2].values.length,
    filters[3].values.length,
  ]);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="reporte" />
      <main className="n-content p-5">
        <Header
          title="Reporte"
          description="Obten un reporte detallado de los horarios de ingreso de pilotos y
        auxiliares."
        />
        <div className="n-body mt-5">
          <DataTable columns={columns} data={reports} totalReports={totalReports} loading={loading} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
