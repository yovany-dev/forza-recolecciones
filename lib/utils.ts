import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GetLocationType } from '@/types/clockInType';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Guatemala');

export const now = () => dayjs.tz();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLocationUtils(): Promise<GetLocationType> {
  if (!navigator.geolocation) {
    return {
      status: false,
      message: 'El navegador no soporta la geolocalización.',
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        resolve({
          status: true,
          message: 'Ubicación detectada exitosamente.',
          data: pos,
        });
      },
      (error) => {
        resolve({
          status: false,
          message: 'Ubicación no detectada.',
          error,
        });
      }
    );
  });
}
