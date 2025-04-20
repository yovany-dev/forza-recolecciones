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

const employeeType: Record<EmployeeType, string> = {
  driver: reportPositionConstant.PILOTO_RECOLECTOR,
  copilot: reportPositionConstant.AUXILIAR_RECOLECTOR,
};
interface ReportStore {
  reports: reportSchemaType[] | [];
  availableReports: employeeSchemaType[] | [];
  loading: boolean;
  newReportLoading: boolean;
  availableReportLoading: boolean;

  setReports: (data: reportSchemaType[]) => void;
  setAvailableReports: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;
  setNewReportLoading: (state: boolean) => void;
  setAvailableReportLoading: (state: boolean) => void;

  createReport: (dpi: string, position: string) => void;

  getReports: () => void;
  getEmployeeNumber: (
    data: reportSchemaType[],
    employee: EmployeeType
  ) => string[];
  getAvailableReports: () => void;
}
export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  availableReports: [],
  loading: false,
  newReportLoading: false,
  availableReportLoading: false,

  setReports: (reports) => set({ reports }),
  setAvailableReports: (availableReports) => set({ availableReports }),
  setLoading: (newState) => set({ loading: newState }),
  setNewReportLoading: (newState) => set({ newReportLoading: newState }),
  setAvailableReportLoading: (newState) =>
    set({ availableReportLoading: newState }),

  createReport: async (dpi, position) => {
    const {
      reports,
      setReports,
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
    successfulNotification('Reporte creado exitosamente.');

    const filteredReports = availableReports.filter(
      (report) => report.dpi !== res.report.dpi
    );
    setAvailableReports(filteredReports);
  },

  getReports: async () => {
    const { setReports, setLoading, availableReports, getAvailableReports } =
      useReportStore.getState();
    const data = await getReportService();

    setReports(data.data);
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
}));
