import { LoginHome } from "@/components/home/loginHome";
import { getEmployeeSession } from "@/lib/auth/getEmployeeSession";
import { ClockInHome } from "@/components/home/clockInHome";

export default async function Home() {
  const session = await getEmployeeSession();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="w-full max-w-sm">
        {!session ? (
          <LoginHome />
        ) : (
          <ClockInHome fullname={session.fullname} uuid={session.uuid} />
        )}
      </div>
    </div>
  );
}
