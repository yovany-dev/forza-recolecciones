import { driverSchemaType } from "./zod/driver";

const updateDriver = async (data: driverSchemaType) => {
  const res = await fetch("/api/driver", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const driver = await res.json();
  return driver;
};

export { updateDriver };
