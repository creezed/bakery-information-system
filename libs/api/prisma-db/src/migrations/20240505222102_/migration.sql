/*
  Warnings:

  - Added the required column `name` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
