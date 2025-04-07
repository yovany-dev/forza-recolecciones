import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/report/header";
import { DataTable } from "@/app/dashboard/reporte/data-table";
import { columns } from "@/app/dashboard/reporte/columns";

import { reportSchemaType } from "@/lib/zod/report";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];
  const dataReports: reportSchemaType[] = [
    {
      employeeNumber: "111654",
      fullname: "Denilson Yovani Morales Chivalan",
      dpi: "3270080241402",
      position: "Auxiliar Recolector",
      schedule: "07:30",
      checkIn: "07:10",
      location: "Detectada", // No Detectada
      photo: "Cargada", // No Cargada
      state: "Ingreso", // Pendiente, Llego tarde
    },
    {
      employeeNumber: "574632",
      fullname: "Juan Carlos Mateo",
      dpi: "3270080241402",
      position: "Piloto Recolector",
      schedule: "08:30",
      checkIn: "08:20",
      location: "No Detectada",
      photo: "No Cargada",
      state: "Pendiente",
    },
  ];

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="reporte" />
      <main className="n-content p-5">
        <Header />
        <div className="n-body mt-5">
          <DataTable columns={columns} data={dataReports} loading={false} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
