"use client";

import { PropsWithChildren } from "react";
import { ArrowsClockwiseIcon, HouseIcon } from "@phosphor-icons/react";
import { DashboardLayout, type Props } from "@/components/dashboard-layout";

const NAV_ITEMS: Props["items"] = [
  {
    label: "Home",
    href: "/dashboard/home",
    icon: <HouseIcon size={20} />,
    roles: ["USER", "ADMIN"]
  },
  {
    label: "Switch to Admin",
    href: "/admin/home",
    icon: <ArrowsClockwiseIcon size={20} />,
    roles: ["ADMIN"]
  }
];

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <DashboardLayout
      title="User"
      items={NAV_ITEMS}
      allowedRoles={["USER", "ADMIN"]}
      unauthorizedRedirect="/"
    >
      {children}
    </DashboardLayout>
  );
}
