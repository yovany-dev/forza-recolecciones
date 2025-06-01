import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GetLocationType } from '@/types/clockInType';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { stateEnumType } from '@/lib/zod/clockIn';

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

export const imageCompressionUtils = async (file: File) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return {
      success: true,
      image: compressedFile,
    };
  } catch (error) {
    return {
      success: false,
      image: file,
      error,
    };
  }
};

export const uploadPhotoUtils = async (file: File, uuid: string) => {
  try {
    const storageRef = ref(storage, `reports/${uuid}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return {
      success: true,
      url: downloadURL,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const scheduleValidation = (
  schedule: string,
  currentTime: string
): stateEnumType => {
  const states: Record<stateEnumType, stateEnumType> = {
    ADMIN: 'ADMIN',
    INGRESADO: 'INGRESADO',
    PENDIENTE: 'PENDIENTE',
    INGRESO_TARDE: 'INGRESO_TARDE',
  };
  const [scheduleHour, scheduleMinute] = schedule.split(':').map(Number);
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);

  const scheduleInMinutes = scheduleHour * 60 + scheduleMinute;
  const currentInMinutes = currentHour * 60 + currentMinute;

  if (currentInMinutes <= scheduleInMinutes) {
    return states.INGRESADO;
  } else {
    return states.INGRESO_TARDE;
  }
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const isPM = hour >= 12;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedHour = String(displayHour).padStart(2, '0');
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${
    isPM ? 'PM' : 'AM'
  }`;
};
