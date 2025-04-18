import { create } from 'zustand';
import { employeeSchemaType } from '@/lib/zod/employee';
import { PaginationType } from '@/types/driverType';
import { getDriverService } from '@/services/driverService';

interface DriverStore {
  drivers: employeeSchemaType[] | [];
  loading: boolean;
  search: string;
  pagination: PaginationType;
  availableTimes: string[];
  filter: boolean;
  selectedTimes: string[];
  setDrivers: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;
  setSearch: (data: string) => void;
  setPagination: (data: PaginationType) => void;
  setFilter: (state: boolean) => void;
  setSelectedTimes: (hour: string) => void;
  initialSchedules: (values: string[]) => void;
  clearFilterTime: () => void;
  getDrivers: () => void;
  updateDriver: (
    uuid: string | undefined,
    updatedData: Partial<employeeSchemaType>
  ) => void;
  removeDriver: (uuid: string | undefined) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [],
  loading: false,
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
  setLoading: (newState) => set({ loading: newState }),
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
    const {
      search,
      pagination,
      setDrivers,
      setLoading,
      setPagination,
      selectedTimes,
    } = useDriverStore.getState();
    const res = await getDriverService(
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
    setLoading(false);
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
