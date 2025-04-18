"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { CreateEmployee } from "@/components/new/create-employee";

export function TabsEmployee() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("defaultValue")!;

  return (
    <Tabs
      defaultValue={defaultValue ? defaultValue : "piloto"}
      className="max-w-[750px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="piloto">Piloto</TabsTrigger>
        <TabsTrigger value="auxiliar">Auxiliar</TabsTrigger>
      </TabsList>
      <TabsContent value="piloto">
        <CreateEmployee type="Piloto" />
      </TabsContent>
      <TabsContent value="auxiliar">
        <CreateEmployee type="Auxiliar" />
      </TabsContent>
    </Tabs>
  );
}
