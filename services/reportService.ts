import { createReportSchemaType } from '@/lib/zod/report';

export async function createReportService(data: createReportSchemaType) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${BASE_URL}/api/report`, {
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

export async function getReportService() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${BASE_URL}/api/report`);
  const data = await res.json();
  return data;
}

export async function getNewReportService(
  drivers: string[],
  copilots: string[]
) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(
    `${BASE_URL}/api/new-report?drivers=${drivers.toString()}&copilots=${copilots.toString()}`
  );
  const data = await res.json();
  return data;
}
