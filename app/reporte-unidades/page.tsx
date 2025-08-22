import { Login } from "@/components/unitsReport/login";
import { getDriverSession } from "@/lib/auth/getDriverSession";
// import { ClockInHome } from "@/components/home/clockInHome";

export default async function Home() {
  const session = await getDriverSession();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="w-full max-w-xs">
        {!session ? (
          <Login />
        ) : (
          // <ClockInHome
          //   fullname={session.fullname}
          //   uuid={session.uuid}
          //   dpi={session.dpi}
          // />
          <div>Hola, {session.fullname}</div>
        )}
      </div>
    </div>
  );
}
