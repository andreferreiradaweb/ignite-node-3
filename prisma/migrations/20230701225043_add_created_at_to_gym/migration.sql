/*
  Warnings:

  - Made the column `latitude` on table `Gym` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Gym` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Gym" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;
