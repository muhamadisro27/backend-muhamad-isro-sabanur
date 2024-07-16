/*
  Warnings:

  - You are about to drop the column `price` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `price_product` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `deleted_at` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `price`,
    ADD COLUMN `price_product` INTEGER NOT NULL,
    ADD COLUMN `total_price` INTEGER NOT NULL;
