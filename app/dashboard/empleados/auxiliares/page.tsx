"use client";

import { useEffect } from "react";
import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/common/header/header";
import { DataTable } from "@/components/employee/data-table";
import { columns } from "@/components/employee/columns";
import { useEmployeeStore } from "@/lib/store/useEmployeeStore";
import { useDebounce } from "use-debounce";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  const {
    employees,
    loading,
    search,
    pagination,
    getEmployee,
    setEmployeeType,
    setLoading,
    setFilter,
    selectedTimes,
  } = useEmployeeStore();
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setEmployeeType("copilot");
    setFilter(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    getEmployee();
  }, [debouncedSearch, pagination.page, selectedTimes]);

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="auxiliares" />
      <main className="n-content p-5">
        <Header
          title="Lista de Auxiliares"
          description="Agrega, configura y administra la información de los auxiliares."
        />
        <div className="n-body mt-5">
          <DataTable columns={columns} data={employees} loading={loading} />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
