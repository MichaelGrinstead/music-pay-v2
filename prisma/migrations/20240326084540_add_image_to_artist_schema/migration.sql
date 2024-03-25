/*
  Warnings:

  - You are about to drop the column `image` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "image",
ADD COLUMN     "avatarImage" TEXT,
ADD COLUMN     "bannerImage" TEXT;
