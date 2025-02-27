-- CreateTable
CREATE TABLE "Drivers" (
    "uuid" TEXT NOT NULL,
    "employeeNumber" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "dpi" INTEGER NOT NULL,
    "schedule" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_employeeNumber_key" ON "Drivers"("employeeNumber");
