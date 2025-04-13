-- CreateEnum
CREATE TYPE "Location" AS ENUM ('DETECTADA', 'NO DETECTADA');

-- CreateEnum
CREATE TYPE "Photo" AS ENUM ('CARGADA', 'NO CARGADA');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('INGRESADO', 'PENDIENTE', 'INGRESO TARDE');

-- CreateTable
CREATE TABLE "reports" (
    "uuid" TEXT NOT NULL,
    "employeeNumber" VARCHAR(6) NOT NULL,
    "fullname" TEXT NOT NULL,
    "dpi" VARCHAR(13) NOT NULL,
    "schedule" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "checkIn" TEXT NOT NULL,
    "location" "Location" NOT NULL DEFAULT 'NO DETECTADA',
    "photo" "Photo" NOT NULL DEFAULT 'NO CARGADA',
    "state" "State" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "reports_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "reports_employeeNumber_key" ON "reports"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "reports_dpi_key" ON "reports"("dpi");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
