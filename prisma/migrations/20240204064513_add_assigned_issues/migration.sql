/*
  Warnings:

  - You are about to alter the column `title` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
