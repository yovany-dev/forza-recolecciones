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
        <div className="content p-5 border border-white">
          <div className="head">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Lista de Pilotos</h1>
            <p className="text-base text-muted-foreground">Agrega, configura y administra la información de los pilotos.</p>
          </div>
          <div className="body">
            <div className="button"></div>
            <div className="table"></div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
};

export default Page;
