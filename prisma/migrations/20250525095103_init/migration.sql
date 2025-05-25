-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('superadmin', 'admin') NOT NULL DEFAULT 'admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NULL,
    `kkNumber` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `birth_place` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `village` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `regency` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `kode_pos` VARCHAR(191) NULL,
    `dormitory` VARCHAR(191) NULL,
    `education_level` VARCHAR(191) NULL,
    `entry_year` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_nik_key`(`nik`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
