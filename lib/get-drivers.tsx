import { PaginationType } from "@/types/driverType";
import { driverSchemaType } from "./zod/driver";

interface DriversResponse extends PaginationType {
  data: driverSchemaType[];
}

export async function getDriversData(
  search: string,
  page: number
): Promise<DriversResponse> {
  const res = await fetch(`/api/driver?page=${page}&search=${search}`);
  const drivers = await res.json();

  return drivers;
}
