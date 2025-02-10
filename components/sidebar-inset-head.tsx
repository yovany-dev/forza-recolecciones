import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Props } from "@/types/sidebar";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

const SidebarInsetHead: React.FC<Props> = ({ links, title }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => {
              return (
                <div className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5" key={index}>
                  <BreadcrumbItem className="hidden md:block">
                    <Link
                      href={link.url}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </div>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default SidebarInsetHead;
