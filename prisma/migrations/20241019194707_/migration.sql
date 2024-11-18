/*
  Warnings:

  - You are about to drop the `Tuition` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_studentId_fkey";

-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Tuition";

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "requirementId" INTEGER NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
