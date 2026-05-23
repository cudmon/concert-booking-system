"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRightIcon,
  IdentificationBadgeIcon,
  UserGearIcon
} from "@phosphor-icons/react";

const BRAND_BLUE = "#0e6ba8";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          <span
            className="block h-6 w-6 rounded-full"
            style={{ backgroundColor: BRAND_BLUE }}
          />
          <span
            style={{ color: BRAND_BLUE }}
            className="text-xl font-bold tracking-wide"
          >
            BRAND
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
            Select Access Level
          </h1>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Lorem ipsum dolor sit amet consectetur. Elit purus nam.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          <RoleCard
            href="/dashboard/login"
            title="User"
            variant="light"
            cta="Enter Workspace"
            description="Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non"
            icon={
              <IdentificationBadgeIcon
                size={80}
                weight="fill"
                color={BRAND_BLUE}
              />
            }
          />
          <RoleCard
            variant="dark"
            cta="Enter Portal"
            href="/admin/login"
            title="Administrator"
            icon={<UserGearIcon size={80} weight="fill" color="#ffffff" />}
            description="Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non"
          />
        </div>
      </main>
    </div>
  );
}

function RoleCard({
  variant,
  title,
  description,
  icon,
  cta,
  href
}: Readonly<{
  variant: "light" | "dark";
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  href: Route;
}>) {
  const isDark = variant === "dark";

  return (
    <div
      className="flex flex-col rounded-lg p-6 shadow-sm sm:p-10"
      style={{
        color: isDark ? "#ffffff" : "#111827",
        backgroundColor: isDark ? BRAND_BLUE : "#ffffff"
      }}
    >
      <div className="mb-8 sm:mb-12">{icon}</div>
      <h2
        className="text-2xl font-bold sm:text-3xl"
        style={{ color: isDark ? "#ffffff" : BRAND_BLUE }}
      >
        {title}
      </h2>
      <p
        style={{ color: isDark ? "rgba(255,255,255,0.9)" : BRAND_BLUE }}
        className="mt-4 max-w-sm text-sm leading-relaxed sm:mt-6 sm:text-base"
      >
        {description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-base font-medium transition-opacity hover:opacity-90 sm:mt-10"
        style={{
          color: isDark ? BRAND_BLUE : "#ffffff",
          backgroundColor: isDark ? "#ffffff" : BRAND_BLUE
        }}
      >
        {cta}
        <ArrowRightIcon size={18} weight="bold" />
      </Link>
    </div>
  );
}
