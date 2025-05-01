/*
  Warnings:

  - Changed the type of `checkIn` on the `reports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reports" DROP COLUMN "checkIn",
ADD COLUMN     "checkIn" TIME NOT NULL;
