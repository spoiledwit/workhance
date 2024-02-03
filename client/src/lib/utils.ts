import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(text: string | undefined) {
  return text?.charAt(0).toUpperCase() + text!.slice(1);
}

export function count(arr: any[]) {

  let count = 0;

  arr.map(x => {
    count++;
  });

  return count;
}
