-- CreateTable
CREATE TABLE "clock-in" (
    "uuid" TEXT NOT NULL,
    "employeeUuid" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "clock-in_pkey" PRIMARY KEY ("uuid")
);
