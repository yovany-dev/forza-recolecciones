'use client';

import { formatDate } from '@/lib/utils';
interface LocalReport {
  uuid: string;
  fullname: string;
  date: string;
  checkIn: string;
}

const STORAGE_KEY = 'clockin_report';

export const setLocalReport = (report: LocalReport) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
  }
};

export const getLocalReport = (): LocalReport | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const storedReport: LocalReport = JSON.parse(data);
    const today = formatDate(new Date());

    if (storedReport.date === today) {
      return storedReport;
    } else {
      return null;
    }
  }
  return null;
};
