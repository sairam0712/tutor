/*
  Warnings:

  - Added the required column `address` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
