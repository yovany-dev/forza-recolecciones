/*
  Warnings:

  - Added the required column `dpi` to the `clock-in` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clock-in" ADD COLUMN     "dpi" TEXT NOT NULL;
