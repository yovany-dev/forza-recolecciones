import { create } from 'zustand';
import { employeeSchemaType } from '@/lib/zod/employee';
import { EmployeeType, PaginationType } from '@/types/employeeType';
import { getEmployeeService } from '@/services/employeeService';

interface EmployeeStore {
  employeeType: string;
  employees: employeeSchemaType[] | [];
  loading: boolean;
  search: string;
  pagination: PaginationType;
  availableTimes: string[];
  filter: boolean;
  selectedTimes: string[];
  setEmployeeType: (type: EmployeeType) => void;
  setEmployee: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;
  setSearch: (data: string) => void;
  setPagination: (data: PaginationType) => void;
  setFilter: (state: boolean) => void;
  setSelectedTimes: (hour: string) => void;
  initialSchedules: (values: string[]) => void;
  clearFilterTime: () => void;
  getEmployee: () => void;
  updateEmployee: (
    uuid: string | undefined,
    updatedData: Partial<employeeSchemaType>
  ) => void;
  removeEmployee: (uuid: string | undefined) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employeeType: '',
  employees: [],
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

  setEmployeeType: (newEmployeeType) => set({ employeeType: newEmployeeType }),
  setEmployee: (data) => set({ employees: data }),
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

  getEmployee: async () => {
    const {
      employeeType,
      search,
      pagination,
      setEmployee,
      setLoading,
      setPagination,
      selectedTimes,
    } = useEmployeeStore.getState();
    const res = await getEmployeeService(
      employeeType as EmployeeType,
      search,
      pagination.page,
      selectedTimes.join(',')
    );
    setEmployee(res.data);
    setPagination({
      page: res.page,
      per_page: res.per_page,
      total: res.total,
      total_pages: res.total_pages,
    });
    setLoading(false);
  },
  updateEmployee: (uuid, updatedData) =>
    set((state) => ({
      employees:
        state.employees?.map((employee) =>
          employee.uuid === uuid ? { ...employee, ...updatedData } : employee
        ) || [],
    })),
  removeEmployee: (uuid) =>
    set((state) => ({
      employees:
        state.employees?.filter((employee) => employee.uuid !== uuid) || [],
    })),
}));
