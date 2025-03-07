"use client";

import { useEffect, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Links } from "@/types/sidebar";
import { Header } from "@/components/drivers/header";
import { Controls } from "@/components/drivers/controls";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { driverSchemaType } from "@/lib/zod/driver";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  const [data, setData] = useState<driverSchemaType[] | null>(null);
  const getDrivers = async () => {
    const res = await fetch("/api/driver");
    const drivers = await res.json();
    console.log(drivers)

    setData(drivers.data);
  };
  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="pilotos" />
      <main className="n-content p-5">
        <Header />
        <div className="n-body mt-5">
          <Controls />
          <Separator className="my-4" />
          <div className="n-table container mx-auto py-4">
            {data && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
