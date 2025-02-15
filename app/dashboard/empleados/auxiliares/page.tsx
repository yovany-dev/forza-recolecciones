import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import SidebarInsetHead from "@/components/sidebar-inset-head";

const Page = () => {
  const data: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];

  return (
    <SidebarInset>
      <SidebarInsetHead links={data} title="auxiliares" />
    </SidebarInset>
  );
};

export default Page;
