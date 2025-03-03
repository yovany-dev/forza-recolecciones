/*
  Warnings:

  - A unique constraint covering the columns `[dpi]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Drivers_dpi_key" ON "Drivers"("dpi");
