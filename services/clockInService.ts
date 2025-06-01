import { clockInSchemaType } from '@/lib/zod/clockIn';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function createClockInService(data: clockInSchemaType) {
  const res = await fetch(`${BASE_URL}/api/report/clock-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataRes = await res.json();
  return dataRes;
}

export async function checkReportService(dpi: string) {
  const res = await fetch(`${BASE_URL}/api/report/check?dpi=${dpi}`);
  const dataRes = await res.json();
  return dataRes;
}
