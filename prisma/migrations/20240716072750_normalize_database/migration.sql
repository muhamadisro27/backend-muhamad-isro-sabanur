/*
  Warnings:

  - You are about to drop the column `email` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `merchant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `merchant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `merchant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Customer_email_key` ON `customer`;

-- DropIndex
DROP INDEX `Merchant_email_key` ON `merchant`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `merchant` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('CUSTOMER', 'MERCHANT') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_userId_key` ON `Customer`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Merchant_userId_key` ON `Merchant`(`userId`);

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Merchant` ADD CONSTRAINT `Merchant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
