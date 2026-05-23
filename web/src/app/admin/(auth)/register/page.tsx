import { RegisterForm } from "@/components/register-form";

export default function Page() {
  return (
    <RegisterForm
      role="ADMIN"
      successHref="/admin/home"
      loginHref="/admin/login"
    />
  );
}
