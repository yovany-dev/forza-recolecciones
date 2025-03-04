/*
  Warnings:

  - A unique constraint covering the columns `[employeeNumber,dpi]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Drivers_dpi_key";

-- DropIndex
DROP INDEX "Drivers_employeeNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_employeeNumber_dpi_key" ON "Drivers"("employeeNumber", "dpi");
