/*
  Warnings:

  - A unique constraint covering the columns `[employeeNumber]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dpi]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Drivers_employeeNumber_dpi_key";

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_employeeNumber_key" ON "Drivers"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_dpi_key" ON "Drivers"("dpi");
