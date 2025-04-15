import { create } from 'zustand';
import { reportSchemaType } from '../zod/report';
import {
  createReportService,
  getReportService,
} from '@/services/reportService';

interface ReportStore {
  reports: reportSchemaType[] | [];
  loading: boolean;

  setReports: (data: reportSchemaType[]) => void;
  setLoading: (state: boolean) => void;

  getReports: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  loading: false,

  setReports: (reports) => set({ reports }),
  setLoading: (newState) => set({ loading: newState }),

  getReports: async () => {
    const { setReports, setLoading } = useReportStore.getState();
    const data = await getReportService();

    setReports(data.data);
    setLoading(false);
  },
}));
