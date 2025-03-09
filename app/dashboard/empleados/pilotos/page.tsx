"use client";

import { useEffect, useState } from "react";
import { Links } from "@/types/sidebar";
import { driverSchemaType } from "@/lib/zod/driver";
import { PaginationType } from "@/types/paginationType";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/drivers/header";
import { Controls } from "@/components/drivers/controls";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/app/dashboard/empleados/pilotos/data-table";
import { columns } from "@/app/dashboard/empleados/pilotos/columns";
import { getDriversData } from "@/lib/get-drivers";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  const dataFooter: PaginationType = {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  };
  const [data, setData] = useState<driverSchemaType[] | null>(null);
  const [paginationData, setPaginationData] =
    useState<PaginationType>(dataFooter);

  const getDrivers = async () => {
    const drivers = await getDriversData(paginationData.page);

    setData(drivers.data);
    setPaginationData({
      page: drivers.page,
      per_page: drivers.per_page,
      total: drivers.total,
      total_pages: drivers.total_pages,
    });
  };
  useEffect(() => {
    getDrivers();
  }, [paginationData.page]);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="pilotos" />
      <main className="n-content p-5">
        <Header />
        <div className="n-body mt-5">
          <Controls />
          <Separator className="my-4" />
          <div className="n-table container mx-auto py-4">
            <DataTable
              columns={columns}
              data={data}
              loading={data === null}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
          </div>
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
