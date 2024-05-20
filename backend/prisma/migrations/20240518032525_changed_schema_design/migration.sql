/*
  Warnings:

  - The values [VARCHAR,LONGTEXT] on the enum `AttributeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `attributeName` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `entity_id` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `entityName` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_id` on the `Value` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `Attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeId` to the `Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeType_new" AS ENUM ('TEXT', 'STRING', 'INTEGER', 'BOOLEAN');
ALTER TABLE "Attributes" ALTER COLUMN "type" TYPE "AttributeType_new" USING ("type"::text::"AttributeType_new");
ALTER TYPE "AttributeType" RENAME TO "AttributeType_old";
ALTER TYPE "AttributeType_new" RENAME TO "AttributeType";
DROP TYPE "AttributeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_entity_id_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_attribute_id_fkey";

-- DropIndex
DROP INDEX "Project_projectName_key";

-- DropIndex
DROP INDEX "Value_attribute_id_key";

-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "attributeName",
DROP COLUMN "entity_id",
ADD COLUMN     "entityId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "entityName",
DROP COLUMN "project_id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectName",
DROP COLUMN "user_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Value" DROP COLUMN "attribute_id",
ADD COLUMN     "attributeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
