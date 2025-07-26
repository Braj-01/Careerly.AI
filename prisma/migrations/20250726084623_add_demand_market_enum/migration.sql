/*
  Warnings:

  - The values [HIGH,MEDIUM,LOW] on the enum `DemandLevel` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `marketOutlook` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MarketOutlook" AS ENUM ('Positive', 'Neutral', 'Negative');

-- AlterEnum
BEGIN;
CREATE TYPE "DemandLevel_new" AS ENUM ('Low', 'Medium', 'High');
ALTER TABLE "IndustryInsight" ALTER COLUMN "demandLevel" TYPE "DemandLevel_new" USING ("demandLevel"::text::"DemandLevel_new");
ALTER TYPE "DemandLevel" RENAME TO "DemandLevel_old";
ALTER TYPE "DemandLevel_new" RENAME TO "DemandLevel";
DROP TYPE "DemandLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" "MarketOutlook" NOT NULL;

-- DropEnum
DROP TYPE "MarketOutLook";
