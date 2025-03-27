import { create } from 'zustand';
import { driverSchemaType } from '@/lib/zod/driver';
import { PaginationType, FilterTime } from '@/types/driverType';
import { getDriversData } from '../get-drivers';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps['checked'];
interface DriverStore {
  drivers: driverSchemaType[] | null;
  search: string;
  pagination: PaginationType;
  filter: boolean;
  filterTime: boolean;
  setDrivers: (data: driverSchemaType[]) => void;
  setSearch: (data: string) => void;
  setPagination: (data: PaginationType) => void;
  setFilter: (state: boolean) => void;
  setFilterTime: (checkedState: Checked) => void;
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
  filter: false,
  filterTime: false,

  setDrivers: (data) => set({ drivers: data }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setPagination: (newPagination) => set({ pagination: newPagination }),
  setFilter: (newState) => set({ filter: newState }),
  setFilterTime: (newCheckedState) =>
    set({ filterTime: newCheckedState ? true : false }),

  getDrivers: async () => {
    const { search, pagination, setDrivers, setPagination } =
      useDriverStore.getState();
    const res = await getDriversData(search, pagination.page);
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
