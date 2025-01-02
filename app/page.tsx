import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-5 flex-col p-5 w-min">
      <h1>Hola next.js</h1>
      <Button asChild>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </div>
  );
}
