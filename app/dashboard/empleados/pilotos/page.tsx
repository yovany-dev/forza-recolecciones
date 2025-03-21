"use client";

import { useEffect, useState } from "react";
import { Links } from "@/types/sidebar";
import { PaginationType } from "@/types/paginationType";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/drivers/header";
import { DataTable } from "@/app/dashboard/empleados/pilotos/data-table";
import { columns } from "@/app/dashboard/empleados/pilotos/columns";
import { useDriverStore } from "@/lib/store/useDriverStore";
import { getDriversData } from "@/lib/get-drivers";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

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
  const { drivers, pagination, setPagination, getDrivers } = useDriverStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 500);
  // const [paginationData, setPaginationData] =
  //   useState<PaginationType>(dataFooter);

  // const getDrivers = async () => {
  //   const drivers = await getDriversData(search, paginationData.page);
  //   setDrivers(drivers.data);
  //   setPaginationData({
  //     page: drivers.page,
  //     per_page: drivers.per_page,
  //     total: drivers.total,
  //     total_pages: drivers.total_pages,
  //   });
  // };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [search]);
  useEffect(() => {
    getDrivers();
  }, [debouncedSearch, pagination?.page]);

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
            paginationData={pagination}
            setPaginationData={setPagination}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
