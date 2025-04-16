import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const InputTable = () => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar piloto o auxiliar"
        className="w-64 h-9 pl-8"
      />
    </div>
  );
};

export { InputTable };
