import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Guatemala');

export const now = () => dayjs.tz();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
