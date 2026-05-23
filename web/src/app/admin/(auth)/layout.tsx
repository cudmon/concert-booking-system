import { PropsWithChildren } from "react";
import { AuthLayout } from "@/components/auth-layout";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <AuthLayout>{children}</AuthLayout>;
}
