import { create } from 'zustand';
import { reportSchemaType } from '../zod/report';
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
  newReports: employeeSchemaType[] | [];
  loading: boolean;

  setReports: (data: reportSchemaType[]) => void;
  setNewReports: (data: employeeSchemaType[]) => void;
  setLoading: (state: boolean) => void;

  getReports: () => void;
  getEmployeeNumber: (
    data: reportSchemaType[],
    employee: EmployeeType
  ) => string[];
  getNewReports: () => void;
}
export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  newReports: [],
  loading: false,

  setReports: (reports) => set({ reports }),
  setNewReports: (newReports) => set({ newReports }),
  setLoading: (newState) => set({ loading: newState }),

  getReports: async () => {
    const { setReports, setLoading } = useReportStore.getState();
    const data = await getReportService();

    setReports(data.data);
    setLoading(false);
  },
  getEmployeeNumber: (data, employee) => {
    const filteredEmployees = data.filter(
      (report) => report.position == employeeType[employee]
    );
    const employeeNumbers = filteredEmployees.map((e) => e.employeeNumber);
    return employeeNumbers;
  },
  getNewReports: async () => {
    const { reports, getEmployeeNumber, setNewReports } =
      useReportStore.getState();
    const drivers = getEmployeeNumber(reports, 'driver');
    const copilots = getEmployeeNumber(reports, 'copilot');

    const res = await getNewReportService(drivers, copilots);
    setNewReports(res.data);
  },
}));
