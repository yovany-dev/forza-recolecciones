import { PaginationType } from "@/types/paginationType";
import { driverSchemaType } from "./zod/driver";

interface DriversResponse extends PaginationType {
  data: driverSchemaType[];
}

export async function getDriversData(page: number, search: string): Promise<DriversResponse> {
  const res = await fetch(`/api/driver?page=${page}&search=${search}`);
  const drivers = await res.json();

  return drivers;
}
