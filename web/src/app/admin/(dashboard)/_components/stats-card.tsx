import { ReactNode } from "react";

type Props = {
  label: string;
  value: number;
  icon: ReactNode;
  background: string;
};

export function StatCard({ label, value, background, icon }: Readonly<Props>) {
  return (
    <div
      style={{ backgroundColor: background }}
      className="flex flex-col items-center justify-center rounded-lg px-4 py-6 text-white shadow-sm sm:px-6 sm:py-8"
    >
      <div className="mb-2">{icon}</div>
      <div className="text-base font-medium sm:text-lg">{label}</div>
      <div className="mt-1 text-4xl font-semibold sm:text-5xl">{value}</div>
    </div>
  );
}
