import { LoginForm } from "@/components/login-form";
import { createUser } from "@/lib/create-user";

export default async function LoginPage() {
  // const res = await createUser({
  //   name: 'admin',
  //   email: 'admin@forzadelivery.com',
  //   password: '551172',
  //   role: 'admin',
  // });
  // console.log(res);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
