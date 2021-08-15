/*
  Warnings:

  - You are about to drop the `_DesignerToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToGuest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `designerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "designerId" INTEGER NOT NULL,
ADD COLUMN     "guestId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DesignerToEvent";

-- DropTable
DROP TABLE "_EventToGuest";

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
