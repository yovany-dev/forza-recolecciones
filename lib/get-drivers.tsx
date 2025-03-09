import { PaginationType } from "@/types/paginationType";
import { driverSchemaType } from "./zod/driver";

interface DriversResponse extends PaginationType {
  data: driverSchemaType[];
}

export async function getDriversData(page: number): Promise<DriversResponse> {
  const res = await fetch(`/api/driver?page=${page}`);
  const drivers = await res.json();

  return drivers;
}
