/*
  Warnings:

  - Changed the type of `weightKg` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "weightKg",
ADD COLUMN     "weightKg" DECIMAL(3,1) NOT NULL;
