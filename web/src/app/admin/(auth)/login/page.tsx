import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <LoginForm
      submitLabel="Login as Administrator"
      successHref="/admin/home"
      registerHref="/admin/register"
    />
  );
}
