import { create } from "zustand";
import { driverSchemaType } from "@/lib/zod/driver";

interface DriverStore {
  drivers: driverSchemaType[] | null;
  setDrivers: (data: driverSchemaType[]) => void;
  updateDriver: (uuid: string|undefined, updatedData: Partial<driverSchemaType>) => void;
  removeDriver: (uuid: string|undefined) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: null,

  setDrivers: (data) => set({ drivers: data }),

  updateDriver: (uuid, updatedData) =>
    set((state) => ({
      drivers: state.drivers?.map((driver) =>
        driver.uuid === uuid ? { ...driver, ...updatedData } : driver
      ) || [],
    })),

  removeDriver: (uuid) =>
    set((state) => ({
      drivers: state.drivers?.filter((driver) => driver.uuid !== uuid) || [],
    })),
}));
