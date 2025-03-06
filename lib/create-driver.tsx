import { driverSchemaType } from "./zod/driver";

const createDriver = async (data: driverSchemaType) => {
  const res = await fetch("/api/driver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const driver = await res.json();
  return driver;
};

export { createDriver };
