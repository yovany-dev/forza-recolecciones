import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateDriver } from "@/components/new/create-driver";
import { CreateAssistant } from "./create-assistant";

export function TabsEmployee() {
  return (
    <Tabs defaultValue="driver" className="max-w-[750px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="driver">Piloto</TabsTrigger>
        <TabsTrigger value="assistant">Auxiliar</TabsTrigger>
      </TabsList>
      <TabsContent value="driver">
        <CreateDriver />
      </TabsContent>
      <TabsContent value="assistant">
        <CreateAssistant />
      </TabsContent>
    </Tabs>
  );
}
