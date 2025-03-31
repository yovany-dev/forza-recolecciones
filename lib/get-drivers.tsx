import { PaginationType } from "@/types/driverType";
import { driverSchemaType } from "./zod/driver";

interface DriversResponse extends PaginationType {
  data: driverSchemaType[];
}

export async function getDriversData(
  search: string,
  page: number,
  schedules: string,
): Promise<DriversResponse> {
  const res = await fetch(`/api/driver?page=${page}&search=${search}&fr_horario=${schedules}`);
  const drivers = await res.json();

  return drivers;
}
