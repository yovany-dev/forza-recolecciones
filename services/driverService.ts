import { driverSchemaType } from '@/lib/zod/driver';
import { PaginationType } from '@/types/driverType';

interface DriversResponse extends PaginationType {
  data: driverSchemaType[];
}

export async function createDriverService(data: driverSchemaType) {
  const res = await fetch('/api/driver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const driver = await res.json();
  return driver;
}

export async function getDriverService(
  search: string,
  page: number,
  schedules: string
): Promise<DriversResponse> {
  const res = await fetch(
    `/api/driver?page=${page}&search=${search}&fr_horario=${schedules}`
  );
  const drivers = await res.json();
  return drivers;
}

export async function updateDriverService(data: driverSchemaType) {
  const res = await fetch('/api/driver', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const driver = await res.json();
  return driver;
}

export async function deleteDriverService(uuid: string | undefined) {
  const res = await fetch(`/api/driver/${uuid}`, { method: 'DELETE' });
  const deleteDriver = await res.json();
  return deleteDriver;
}
