import { create } from 'zustand';
import { createReportSchemaType, reportSchemaType } from '../zod/report';
import { reportPositionConstant } from '../constants/report.constants';
import {
  createReportService,
  getReportService,
  getNewReportService,
} from '@/services/reportService';
import { EmployeeType } from '@/types/employeeType';
import { employeeSchemaType } from '@/lib/zod/employee';
import { successfulNotification } from '@/components/notifications';
import { FilterType } from '@/types/reportType';

const employeeType: Record<EmployeeType, string> = {
  driver: reportPositionConstant.PILOTO_RECOLECTOR,
  copilot: reportPositionConstant.AUXILIAR_RECOLECTOR,
};
interface ReportStore {
  reports: reportSchemaType[] | [];
  totalReports: number;
  availableReports: employeeSchemaType[] | [];
  loading: boolean;
  newReportLoading: boolean;
  availableReportLoading: boolean;
  search: string;
  filters: FilterType[];

  setReports: (data: reportSchemaType[]) => void;
  setTotalReports: (data: number) => void;
  setAvailableReports: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;
  setNewReportLoading: (state: boolean) => void;
  setAvailableReportLoading: (state: boolean) => void;
  setSearch: (value: string) => void;
  setFilters: (data: FilterType) => void;

  createReport: (dpi: string, position: string) => void;
  getReports: () => void;
  getEmployeeNumber: (
    data: reportSchemaType[],
    employee: EmployeeType
  ) => string[];
  getAvailableReports: () => void;
  updateReport: (
    uuid: string | undefined,
    updatedData: Partial<reportSchemaType>
  ) => void;
  removeReport: (uuid: string) => void;
}
export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  totalReports: 0,
  availableReports: [],
  loading: false,
  newReportLoading: false,
  availableReportLoading: false,
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

  setReports: (reports) => set({ reports }),
  setTotalReports: (number) => set({ totalReports: number }),
  setAvailableReports: (availableReports) => set({ availableReports }),
  setLoading: (newState) => set({ loading: newState }),
  setNewReportLoading: (newState) => set({ newReportLoading: newState }),
  setAvailableReportLoading: (newState) =>
    set({ availableReportLoading: newState }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setFilters: (updateData) => {
    set((state) => ({
      filters: state.filters.map((filter) =>
        filter.title === updateData.title ? { ...updateData } : filter
      ),
    }));
  },

  createReport: async (dpi, position) => {
    const {
      reports,
      setReports,
      totalReports,
      setTotalReports,
      availableReports,
      setAvailableReports,
      setNewReportLoading,
    } = useReportStore.getState();
    const data: createReportSchemaType = {
      dpi,
      type:
        position === reportPositionConstant.PILOTO_RECOLECTOR
          ? 'driver'
          : 'copilot',
      location: 'ADMIN',
      photo: 'ADMIN',
      state: 'ADMIN',
    };
    const res = await createReportService(data);

    if (res.status !== 201) {
      successfulNotification(res.errorMessage);
      return;
    }
    setNewReportLoading(false);
    setReports([...reports, res.report]);
    setTotalReports(totalReports + 1);
    successfulNotification('Reporte creado exitosamente.');

    const filteredReports = availableReports.filter(
      (report) => report.dpi !== res.report.dpi
    );
    setAvailableReports(filteredReports);
  },
  getReports: async () => {
    const {
      setReports,
      setTotalReports,
      setLoading,
      availableReports,
      getAvailableReports,
      search,
      filters,
    } = useReportStore.getState();
    const data = await getReportService(
      search,
      filters[0].values.join(','),
      filters[1].values.join(','),
      filters[2].values.join(','),
      filters[3].values.join(',')
    );

    setReports(data.data);
    setTotalReports(data.total);
    setLoading(false);
    if (availableReports.length === 0) {
      getAvailableReports();
    }
  },
  getEmployeeNumber: (data, employee) => {
    const filteredEmployees = data.filter(
      (report) => report.position == employeeType[employee]
    );
    const employeeNumbers = filteredEmployees.map((e) => e.employeeNumber);
    return employeeNumbers;
  },
  getAvailableReports: async () => {
    const {
      reports,
      getEmployeeNumber,
      setAvailableReports,
      setAvailableReportLoading,
    } = useReportStore.getState();
    const drivers = getEmployeeNumber(reports, 'driver');
    const copilots = getEmployeeNumber(reports, 'copilot');

    const res = await getNewReportService(drivers, copilots);
    setAvailableReports(res.data);
    setAvailableReportLoading(false);
  },
  updateReport: (uuid, updatedData) =>
    set((state) => ({
      reports:
        state.reports?.map((report) =>
          report.uuid === uuid ? { ...report, ...updatedData } : report
        ) || [],
    })),
  removeReport: (uuid) => {
    set((state) => ({
      reports: state.reports.filter((report) => report.uuid !== uuid) || [],
    }));
  },
}));
