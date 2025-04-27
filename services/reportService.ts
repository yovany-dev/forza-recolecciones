import {
  createReportSchemaType,
  updateReportSchemaType,
} from '@/lib/zod/report';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function createReportService(data: createReportSchemaType) {
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
  const res = await fetch(`${BASE_URL}/api/report`);
  const data = await res.json();
  return data;
}

export async function getNewReportService(
  drivers: string[],
  copilots: string[]
) {
  const res = await fetch(
    `${BASE_URL}/api/new-report?drivers=${drivers.toString()}&copilots=${copilots.toString()}`
  );
  const data = await res.json();
  return data;
}

export async function updateReportService(data: updateReportSchemaType) {
  const res = await fetch(`${BASE_URL}/api/report`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataRes = await res.json();
  return dataRes;
}

export async function deleteReportService(uuid: string) {
  const res = await fetch(`${BASE_URL}/api/report/${uuid}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
}
