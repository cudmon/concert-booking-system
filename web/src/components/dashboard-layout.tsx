"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import type { Route } from "next";
import { Burger, Drawer } from "@mantine/core";
import { useAuth } from "@/hooks/use-auth";
import { useLogout } from "@/hooks/use-logout";
import { SignOutIcon } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode, useState } from "react";

type Props = PropsWithChildren<{
  title: string;
  unauthorizedRedirect: Route;
  allowedRoles: User["role"][];
  items: {
    label: string;
    href: Route;
    icon: ReactNode;
    roles: User["role"][];
  }[];
}>;

export function DashboardLayout({
  title,
  items,
  allowedRoles,
  unauthorizedRedirect,
  children
}: Readonly<Props>) {
  const router = useRouter();
  const logout = useLogout();
  const pathname = usePathname();

  const [opened, setOpened] = useState(false);

  const { data: user } = useAuth();

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return router.push(unauthorizedRedirect);
  }

  const onLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        router.push("/");
      }
    });
  };

  const nav = (
    <>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          if (item.roles && !item.roles.includes(user.role)) {
            return null;
          }

          const active = pathname.startsWith(item.href) && item.href !== "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpened(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-2.5 text-base font-medium transition-colors",
                active
                  ? "bg-[#E7F0F8] text-gray-900"
                  : "text-gray-800 hover:bg-gray-50"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onLogout}
        disabled={logout.isPending}
        className="flex items-center gap-3 rounded-md px-4 py-2.5 text-base font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50"
      >
        <SignOutIcon size={20} />
        <span>Logout</span>
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white px-6 py-8 lg:flex">
        {nav}
      </aside>
      <Drawer
        size="80%"
        padding="lg"
        hiddenFrom="lg"
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(false)}
      >
        <div className="flex h-full flex-col">{nav}</div>
      </Drawer>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <Burger
            opened={opened}
            onClick={() => setOpened((v) => !v)}
            aria-label="Toggle navigation"
            size="sm"
          />
        </header>
        <main className="flex-1 bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
