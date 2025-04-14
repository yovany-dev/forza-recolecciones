"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/common/header/header";
import { DataTable } from "@/app/dashboard/reporte/data-table";
import { columns } from "@/app/dashboard/reporte/columns";

import { reportSchemaType } from "@/lib/zod/report";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];
  const dataReports: reportSchemaType[] = [];
  // const data: reportSchemaType = {
  //   employeeNumber: "111654",
  //   fullname: "Denilson Yovani Morales Chivalan",
  //   dpi: "3270080241402",
  //   position: "Auxiliar Recolector",
  //   schedule: "07:30",
  //   checkIn: "07:10",
  //   location: "NO_DETECTADA",
  //   photo: "CARGADA",
  //   state: "INGRESADO",
  // };
  // const addReport = async () => {
  //   const res = await fetch("/api/report", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const report = await res.json();
  //   console.log(report);
  // };
  // useEffect(() => {
  //   addReport();
  // }, []);

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
          <DataTable columns={columns} data={dataReports} loading={false} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
