/*
  Warnings:

  - You are about to drop the column `name` on the `Attributes` table. All the data in the column will be lost.
  - Added the required column `attributeName` to the `Attributes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "name",
ADD COLUMN     "attributeName" TEXT NOT NULL;
