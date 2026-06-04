-- CreateEnum
CREATE TYPE "PrescriptionStatus" AS ENUM ('PENDING', 'PARTIALLY_DISPENSED', 'DISPENSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "prescriptions" ADD COLUMN     "status" "PrescriptionStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "pharmacy_reception_details" ADD CONSTRAINT "pharmacy_reception_details_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pharmacy_reception_details" ADD CONSTRAINT "pharmacy_reception_details_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "medicine_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
