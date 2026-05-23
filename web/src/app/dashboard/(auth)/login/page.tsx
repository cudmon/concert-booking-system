import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <LoginForm
      submitLabel="Login as User"
      successHref="/dashboard/home"
      registerHref="/dashboard/register"
    />
  );
}
