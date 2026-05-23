import { PropsWithChildren } from "react";

export function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-[#0070A4] p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <span className="block h-10 w-10 rounded-full bg-white" />
          <span className="text-2xl font-bold tracking-wide">BRAND</span>
        </div>
        <div className="max-w-md">
          <p className="text-3xl leading-snug font-semibold">
            &ldquo;Powering the tools that power the team.&rdquo;
          </p>
          <p className="mt-6 text-sm text-white/80">
            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
            porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean
            non
          </p>
        </div>
      </aside>
      <main className="flex items-center justify-center bg-white p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
