import { employeeSchemaType } from "@/lib/zod/employee";
import { EmployeeType, PaginationType } from "@/types/employeeType";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
interface EmployeeResponse extends PaginationType {
  data: employeeSchemaType[];
}

export async function createEmployeeService(
  employeeType: EmployeeType,
  employee: employeeSchemaType
) {
  const res = await fetch(`${BASE_URL}/api/${employeeType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  const data = await res.json();
  return data;
}

export async function getEmployeeService(
  employeeType: EmployeeType,
  search: string,
  page: number,
  schedules: string
): Promise<EmployeeResponse> {
  const res = await fetch(
    `${BASE_URL}/api/${employeeType}?page=${page}&search=${search}&fr_horario=${schedules}`
  );
  const data = await res.json();
  return data;
}

export async function updateEmployeeService(
  employeeType: EmployeeType,
  employee: employeeSchemaType
) {
  const res = await fetch(`${BASE_URL}/api/${employeeType}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  const data = await res.json();
  return data;
}

export async function deleteEmployeeService(
  employeeType: EmployeeType,
  uuid: string | undefined
) {
  const res = await fetch(`${BASE_URL}/api/${employeeType}/${uuid}`, {
    method: "DELETE",
  });
  const deleteEmployee = await res.json();
  return deleteEmployee;
}
