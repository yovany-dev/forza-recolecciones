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

const employeeType: Record<EmployeeType, string> = {
  driver: reportPositionConstant.PILOTO_RECOLECTOR,
  copilot: reportPositionConstant.AUXILIAR_RECOLECTOR,
};
interface ReportStore {
  reports: reportSchemaType[] | [];
  availableReports: employeeSchemaType[] | [];
  loading: boolean;

  setReports: (data: reportSchemaType[]) => void;
  setAvailableReports: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;

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

  setReports: (reports) => set({ reports }),
  setAvailableReports: (availableReports) => set({ availableReports }),
  setLoading: (newState) => set({ loading: newState }),

  createReport: async (dpi, position) => {
    const { reports, setReports, availableReports, setAvailableReports } =
      useReportStore.getState();
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
    setReports([...reports, res.report]);

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
    const { reports, getEmployeeNumber, setAvailableReports } =
      useReportStore.getState();
    const drivers = getEmployeeNumber(reports, 'driver');
    const copilots = getEmployeeNumber(reports, 'copilot');

    const res = await getNewReportService(drivers, copilots);
    setAvailableReports(res.data);
  },
}));
