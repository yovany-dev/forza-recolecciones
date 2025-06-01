import { create } from 'zustand';
import { getLocationUtils } from '@/lib/utils';
import { CoordinatesType } from '@/types/clockInType';

interface ClockInStore {
  joined: boolean;
  coordinates: CoordinatesType | null;
  coordinatesStates: {
    status: boolean | null;
    message: string | null;
  };
  loading: boolean;
  message: string;
  setJoined: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setMessage: (value: string) => void;
  getLocation: () => void;
}
export const useClockInStore = create<ClockInStore>((set) => ({
  joined: false,
  coordinates: null,
  coordinatesStates: {
    status: null,
    message: null,
  },
  loading: false,
  message: '',
  setJoined: (value) => {
    set({ joined: value });
  },
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
