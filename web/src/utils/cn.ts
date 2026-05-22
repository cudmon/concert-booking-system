import { twMerge } from "tailwind-merge";
import { type ClassArray, clsx } from "clsx";

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(inputs));
}
