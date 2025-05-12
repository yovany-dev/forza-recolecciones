import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
