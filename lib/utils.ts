import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
