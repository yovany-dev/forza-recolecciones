"use client"

import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Links } from "@/types/sidebar";
import { getData } from "@/lib/get-data";
import { Header } from "@/components/drivers/header";
import { Controls } from "@/components/drivers/controls";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect } from "react";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  // const data = await getData();
  const getDrivers = async () => {
    const res = await fetch("/api/driver");
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    getDrivers()
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
            {/* <DataTable columns={columns} data={data} /> */}
          </div>
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
