import { useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useReportStore } from "@/lib/store/useReportStore";
import { useRouter, useSearchParams } from "next/navigation";

const InputTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, setSearch } = useReportStore();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [search]);

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar piloto o auxiliar"
        className="w-64 h-9 pl-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export { InputTable };
