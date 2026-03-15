/*
  Warnings:

  - Added the required column `event` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT;

-- CreateIndex
CREATE INDEX "Event_websiteId_createdAt_idx" ON "Event"("websiteId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_sessionId_idx" ON "Event"("sessionId");

-- CreateIndex
CREATE INDEX "Event_visitorId_idx" ON "Event"("visitorId");
