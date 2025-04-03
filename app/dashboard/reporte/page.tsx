import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";
import { Header } from "@/components/report/header";

const Page = () => {
  const dataLink: Links[] = [{ name: "dashboard", url: "/dashboard" }];

  return (
    <SidebarInset>
      <SidebarInsetHead links={dataLink} title="reporte" />
      <main className="n-content p-5">
        <Header />
        <div></div>
      </main>
    </SidebarInset>
  );
};

export default Page;
