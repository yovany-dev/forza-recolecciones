import { create } from 'zustand';
import { driverSchemaType } from '@/lib/zod/driver';
import { PaginationType } from '@/types/driverType';
import { getDriversData } from '../get-drivers';

interface DriverStore {
  drivers: driverSchemaType[] | null;
  search: string;
  pagination: PaginationType;
  availableTimes: string[];
  filter: boolean;
  selectedTimes: string[];
  setDrivers: (data: driverSchemaType[]) => void;
  setSearch: (data: string) => void;
  setPagination: (data: PaginationType) => void;
  setFilter: (state: boolean) => void;
  setSelectedTimes: (hour: string) => void;
  initialSchedules: (values: string[]) => void;
  clearFilterTime: () => void;
  getDrivers: () => void;
  updateDriver: (
    uuid: string | undefined,
    updatedData: Partial<driverSchemaType>
  ) => void;
  removeDriver: (uuid: string | undefined) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: null,
  search: '',
  pagination: {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  },
  availableTimes: ['07:30', '08:30'],
  filter: false,
  selectedTimes: [],

  setDrivers: (data) => set({ drivers: data }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setPagination: (newPagination) => set({ pagination: newPagination }),
  setFilter: (newState) => set({ filter: newState }),
  setSelectedTimes: (newHour) =>
    set((state) => ({
      selectedTimes: state.selectedTimes.includes(newHour)
        ? state.selectedTimes.filter((h) => h !== newHour)
        : [...state.selectedTimes, newHour],
    })),

  initialSchedules: (newValues) => set({ selectedTimes: newValues }),
  clearFilterTime: () => set({ filter: false, selectedTimes: [] }),

  getDrivers: async () => {
    const { search, pagination, setDrivers, setPagination, selectedTimes } =
      useDriverStore.getState();
    const res = await getDriversData(
      search,
      pagination.page,
      selectedTimes.join(',')
    );
    setDrivers(res.data);
    setPagination({
      page: res.page,
      per_page: res.per_page,
      total: res.total,
      total_pages: res.total_pages,
    });
  },
  updateDriver: (uuid, updatedData) =>
    set((state) => ({
      drivers:
        state.drivers?.map((driver) =>
          driver.uuid === uuid ? { ...driver, ...updatedData } : driver
        ) || [],
    })),
  removeDriver: (uuid) =>
    set((state) => ({
      drivers: state.drivers?.filter((driver) => driver.uuid !== uuid) || [],
    })),
}));
