import { driverSchemaType } from "./zod/driver";

interface DriverResponse {
  errorMessage: string;
  status: number;
}
const createDriver = async (data: driverSchemaType) => {
  const res = await fetch("/api/driver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const driver: DriverResponse = await res.json();
  return driver;
};

export { createDriver };
