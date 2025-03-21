import { create } from 'zustand';
import { driverSchemaType } from '@/lib/zod/driver';
import { getDriversData } from '../get-drivers';
import { PaginationType } from '@/types/paginationType';

interface DriverStore {
  drivers: driverSchemaType[] | null;
  search: string;
  pagination: PaginationType | null;
  setDrivers: (data: driverSchemaType[]) => void;
  setSearch: (data: string) => void;
  setPagination: (data: PaginationType) => void;
  getDrivers: () => void,
  updateDriver: (
    uuid: string | undefined,
    updatedData: Partial<driverSchemaType>
  ) => void;
  removeDriver: (uuid: string | undefined) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: null,
  search: '',
  pagination: null,

  setDrivers: (data) => set({ drivers: data }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setPagination: (newPagination) => set({ pagination: newPagination }),

  getDrivers: async () => {
    const { search, setDrivers, setPagination } = useDriverStore.getState();
    const res = await getDriversData(search, 1);
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
