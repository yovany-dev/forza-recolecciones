import { create } from 'zustand';
import { DateRange } from 'react-day-picker';
import { FilterType } from '@/types/reportType';
import { reportSchemaType } from '@/lib/zod/report';
import { RangeValuesType } from '@/types/recordType';
import { getRecordService } from '@/services/recordService';
import {
  startOfMonth,
  endOfMonth,
  subDays,
  startOfDay,
  subMonths,
} from 'date-fns';

interface RecordStore {
  reports: reportSchemaType[] | [];
  loading: boolean;
  search: string;
  filters: FilterType[];
  dateRange: DateRange | undefined;
  singleDate: Date | undefined;
  periods: RangeValuesType[];
  selectedPeriod: string;
  ranges: Record<RangeValuesType, DateRange>;

  setReports: (data: reportSchemaType[]) => void;
  setLoading: (state: boolean) => void;
  setSearch: (value: string) => void;
  setFilters: (data: FilterType) => void;
  setDateRange: (date: DateRange | undefined) => void;
  setSingleDate: (date: Date | undefined) => void;
  setSelectedPeriod: (value: string) => void;
  getReports: () => void;
}
const now = new Date();
export const useRecordStore = create<RecordStore>((set) => ({
  reports: [],
  loading: false,
  search: '',
  filters: [
    {
      title: 'Horario',
      states: ['07:30', '08:30'],
      values: [],
      active: false,
    },
    {
      title: 'Ubicación',
      states: ['ADMIN', 'DETECTADA', 'NO_DETECTADA'],
      values: [],
      active: false,
    },
    {
      title: 'Foto',
      states: ['ADMIN', 'CARGADA', 'NO_CARGADA'],
      values: [],
      active: false,
    },
    {
      title: 'Estado',
      states: ['ADMIN', 'INGRESADO', 'PENDIENTE', 'INGRESO_TARDE'],
      values: [],
      active: false,
    },
  ],
  dateRange: undefined,
  singleDate: new Date(),
  periods: ['Últimos 7 días', 'Últimos 30 días', 'Este mes', 'Mes pasado'],
  selectedPeriod: '',
  ranges: {
    'Últimos 7 días': {
      from: startOfDay(subDays(now, 7)),
      to: startOfDay(now),
    },
    'Últimos 30 días': {
      from: startOfDay(subDays(now, 30)),
      to: startOfDay(now),
    },
    'Este mes': {
      from: startOfMonth(now),
      to: endOfMonth(now),
    },
    'Mes pasado': {
      from: startOfMonth(subMonths(now, 1)),
      to: endOfMonth(subMonths(now, 1)),
    },
  },

  setReports: (reports) => set({ reports }),
  setLoading: (newState) => set({ loading: newState }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setFilters: (updateData) => {
    set((state) => ({
      filters: state.filters.map((filter) =>
        filter.title === updateData.title ? { ...updateData } : filter
      ),
    }));
  },
  setDateRange: (date) => {
    set({ dateRange: date });
  },
  setSingleDate: (date) => {
    set({ singleDate: date });
  },
  setSelectedPeriod: (value) => {
    set({ selectedPeriod: value });
  },
  getReports: async () => {
    const { search, filters, dateRange, singleDate, setReports, setLoading } =
      useRecordStore.getState();

    const data = await getRecordService(
      search,
      filters[0].values.join(','),
      filters[1].values.join(','),
      filters[2].values.join(','),
      filters[3].values.join(','),
      dateRange,
      singleDate
    );

    if (data.status === 200) {
      setReports(data.data);
    } else {
      setReports([]);
    }
    setLoading(false);
  },
}));
