import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeEmployeeName(name: string) {
  const [lastName, firstName] = name.split(',').map((part) => part.trim());
  return `${firstName} ${lastName}`;
}
