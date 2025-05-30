import { create } from 'zustand';
import { getLocationUtils } from '@/lib/utils';
import { CoordinatesType } from '@/types/clockInType';

interface ClockInStore {
  coordinates: CoordinatesType | null;
  coordinatesStates: {
    status: boolean | null;
    message: string | null;
  };
  getLocation: () => void;
}
export const useClockInStore = create<ClockInStore>((set) => ({
  coordinates: null,
  coordinatesStates: {
    status: null,
    message: null,
  },
  getLocation: async () => {
    const res = await getLocationUtils();

    if (res.status) {
      set({ coordinates: res.data });
    }
    set({
      coordinatesStates: {
        status: res.status,
        message: res.message,
      },
    });
  },
}));
