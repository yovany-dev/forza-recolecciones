import { Links } from "@/types/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInsetHead } from "@/components/sidebar-inset-head";

const Page = () => {
  const data: Links[] = [{ name: "inicio", url: "/" }];

  return (
    <SidebarInset>
      <SidebarInsetHead links={data} title="dashboard" />
    </SidebarInset>
  );
};

export default Page;
