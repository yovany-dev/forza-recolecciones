// import { LoginHome } from "@/components/home/loginHome";
import { ClockIn } from "@/components/home/clockIn";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <LoginHome /> */}
        <ClockIn />
      </div>
    </div>
  );
}
