/*
  Warnings:

  - A unique constraint covering the columns `[requirementId,tutorId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Proposal_requirementId_tutorId_key" ON "Proposal"("requirementId", "tutorId");
