/*
  Warnings:

  - Added the required column `value` to the `Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Value" ADD COLUMN     "value" TEXT NOT NULL;
