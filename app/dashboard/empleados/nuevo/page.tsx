import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/new/header";
import { TabsEmployee } from "@/components/new/actions";

const Page = () => {
  const dataLink: Links[] = [
    { name: "dashboard", url: "/dashboard" },
    { name: "empleados", url: "/dashboard/empleados" },
  ];
  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="nuevo" />
      <main className="n-content p-5">
        <Header />
        <div className="n-body mt-5">
          <TabsEmployee />
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
