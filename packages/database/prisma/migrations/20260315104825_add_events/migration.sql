/*
  Warnings:

  - You are about to drop the column `ip` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_sessionId_idx";

-- DropIndex
DROP INDEX "Event_visitorId_idx";

-- DropIndex
DROP INDEX "Event_websiteId_createdAt_idx";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "ip";
