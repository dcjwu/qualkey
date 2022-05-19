/*
  Warnings:

  - Added the required column `filename` to the `uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapping` to the `uploads` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserActionType" AS ENUM ('REVIEW_UPLOAD', 'REVIEW_WITHDRAWAL');

-- AlterTable
ALTER TABLE "uploads" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mapping" TEXT NOT NULL,
ALTER COLUMN "confirmedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "institutionUuid" TEXT,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "userActions" (
    "id" SERIAL NOT NULL,
    "userUuid" TEXT NOT NULL,
    "type" "UserActionType" NOT NULL,
    "subjectUuid" TEXT NOT NULL,

    CONSTRAINT "userActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneTimePasswords" (
    "uuid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "canBeResentAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oneTimePasswords_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES "institutions"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
