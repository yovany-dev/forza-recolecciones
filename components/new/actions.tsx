"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateDriver } from "@/components/new/create-driver";
import { CreateAssistant } from "./create-assistant";
import { useSearchParams } from "next/navigation";

export function TabsEmployee() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("defaultValue")!;
  console.log(defaultValue);

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
        <CreateDriver />
      </TabsContent>
      <TabsContent value="auxiliar">
        <CreateAssistant />
      </TabsContent>
    </Tabs>
  );
}
