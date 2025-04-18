-- CreateTable
CREATE TABLE "Copilot" (
    "uuid" TEXT NOT NULL,
    "employeeNumber" VARCHAR(6) NOT NULL,
    "fullname" TEXT NOT NULL,
    "dpi" VARCHAR(13) NOT NULL,
    "schedule" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Copilot_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Copilot_employeeNumber_key" ON "Copilot"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Copilot_dpi_key" ON "Copilot"("dpi");

-- AddForeignKey
ALTER TABLE "Copilot" ADD CONSTRAINT "Copilot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
