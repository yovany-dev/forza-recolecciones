import { Login } from "@/components/unitsReport/login";
import { getDriverSession } from "@/lib/auth/getDriverSession";
import { UnitsReport } from "@/components/unitsReport/unitsReport";

export default async function Home() {
  const session = await getDriverSession();

  return (
    <div className="flex min-h-svh flex-col items-center bg-black p-6 md:p-10">
      <div className="w-full max-w-xs">
        {!session ? (
          <Login />
        ) : (
          <UnitsReport fullname={session.fullname} />
        )}
      </div>
    </div>
  );
}
