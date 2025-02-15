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
      <SidebarInsetHead links={data} title="pilotos" />
      <main>
        <h1>Pilotos</h1>
      </main>
    </SidebarInset>
  );
};

export default Page;
