/*
  Warnings:

  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `quantity` INTEGER NOT NULL;
