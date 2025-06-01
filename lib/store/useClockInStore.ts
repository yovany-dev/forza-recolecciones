import { create } from 'zustand';
import { getLocationUtils } from '@/lib/utils';
import { CoordinatesType } from '@/types/clockInType';

interface ClockInStore {
  coordinates: CoordinatesType | null;
  coordinatesStates: {
    status: boolean | null;
    message: string | null;
  };
  loading: boolean;
  message: string;
  setLoading: (value: boolean) => void;
  setMessage: (value: string) => void;
  getLocation: () => void;
}
export const useClockInStore = create<ClockInStore>((set) => ({
  coordinates: null,
  coordinatesStates: {
    status: null,
    message: null,
  },
  loading: false,
  message: '',
  setLoading: (value) => {
    set({ loading: value });
  },
  setMessage: (value) => {
    set({ message: value });
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
