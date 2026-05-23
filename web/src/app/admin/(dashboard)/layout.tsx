"use client";

import { PropsWithChildren } from "react";
import {
  DashboardLayout,
  type DashboardNavItem
} from "@/components/dashboard-layout";
import {
  ArrowsClockwiseIcon,
  HouseIcon,
  TrayIcon
} from "@phosphor-icons/react";

const NAV_ITEMS: DashboardNavItem[] = [
  {
    label: "Home",
    href: "/admin/home",
    icon: <HouseIcon size={20} />,
    roles: ["ADMIN"]
  },
  {
    label: "History",
    href: "/admin/history",
    icon: <TrayIcon size={20} />,
    roles: ["ADMIN"]
  },
  {
    label: "Switch to User",
    href: "/dashboard/home",
    icon: <ArrowsClockwiseIcon size={20} />,
    roles: ["ADMIN"]
  }
];

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <DashboardLayout
      title="Admin"
      navItems={NAV_ITEMS}
      allowedRoles={["ADMIN"]}
      unauthorizedRedirect="/dashboard/home"
    >
      {children}
    </DashboardLayout>
  );
}
