/*
  Warnings:

  - You are about to alter the column `employeeNumber` on the `Drivers` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE "Drivers" ALTER COLUMN "employeeNumber" SET DATA TYPE VARCHAR(6),
ALTER COLUMN "dpi" SET DATA TYPE VARCHAR(13);
