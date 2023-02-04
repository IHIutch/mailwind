/*
  Warnings:

  - You are about to drop the column `membershipId` on the `Template` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('TEXT', 'H1', 'H2', 'H3', 'DIVIDER', 'QUOTE', 'IMAGE', 'CODE');

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "type",
ADD COLUMN     "type" "BlockType" NOT NULL,
ALTER COLUMN "position" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "membershipId";
