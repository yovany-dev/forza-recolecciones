"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/common/header/header";
import { useReportStore } from "@/lib/store/useReportStore";
import { DataTable } from "@/app/dashboard/reporte/data-table";
import { columns } from "@/app/dashboard/reporte/columns";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];
  const {
    reports,
    getReports,
    loading,
    setLoading,
    setAvailableReportLoading,
  } = useReportStore();

  useEffect(() => {
    setLoading(true);
    // setAvailableReportLoading(true);
    getReports();
  }, []);

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
          <DataTable columns={columns} data={reports} loading={loading} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
