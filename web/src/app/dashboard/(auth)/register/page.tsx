import { RegisterForm } from "@/components/register-form";

export default function Page() {
  return (
    <RegisterForm
      role="USER"
      successHref="/dashboard/home"
      loginHref="/dashboard/login"
    />
  );
}
