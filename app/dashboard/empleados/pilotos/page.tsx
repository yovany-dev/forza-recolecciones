"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/drivers/header";
import { DataTable } from "@/app/dashboard/empleados/pilotos/data-table";
import { columns } from "@/app/dashboard/empleados/pilotos/columns";
import { useDriverStore } from "@/lib/store/useDriverStore";
import { useDebounce } from "use-debounce";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  const { drivers, search, pagination, getDrivers } = useDriverStore();
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    getDrivers();
  }, [debouncedSearch, pagination.page]);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="pilotos" />
      <main className="n-content p-5">
        <Header />
        <div className="n-body mt-5">
          <DataTable
            columns={columns}
            data={drivers}
            loading={drivers === null}
          />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
