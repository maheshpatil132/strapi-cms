/*
  Warnings:

  - You are about to drop the column `entity_id` on the `Value` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attribute_id]` on the table `Value` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Value" DROP COLUMN "entity_id";

-- CreateIndex
CREATE UNIQUE INDEX "Value_attribute_id_key" ON "Value"("attribute_id");

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
