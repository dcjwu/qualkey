-- CreateEnum
CREATE TYPE "CredentialStatus" AS ENUM ('NEW', 'UPLOADING_TO_BLOCKCHAIN', 'FAILED_UPLOADING_TO_BLOCKCHAIN', 'UPLOADED_TO_BLOCKCHAIN', 'ACTIVATED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "InsitutionStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CredentialChangeRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('NEW', 'PENDING', 'CONFIRMED', 'FAILED');

-- CreateTable
CREATE TABLE "credentials" (
    "uuid" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "status" "CredentialStatus" NOT NULL,
    "studentUuid" TEXT NOT NULL,
    "institutionUuid" TEXT NOT NULL,
    "certificateId" TEXT,
    "graduatedName" TEXT,
    "authenticatedBy" TEXT,
    "qualificationName" TEXT,
    "majors" TEXT,
    "minors" TEXT,
    "authenticatedTitle" TEXT,
    "awardingInstitution" TEXT,
    "qualificationLevel" TEXT,
    "awardLevel" TEXT,
    "studyLanguage" TEXT,
    "info" TEXT,
    "gpaFinalGrade" TEXT,
    "authenticatedAt" TIMESTAMP(3),
    "studyStartedAt" TIMESTAMP(3),
    "studyEndedAt" TIMESTAMP(3),
    "graduatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "institutions" (
    "uuid" TEXT NOT NULL,
    "status" "InsitutionStatus" NOT NULL,
    "emailDomain" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "uploads" (
    "uuid" TEXT NOT NULL,
    "status" "UploadStatus" NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "confirmationsRequestedFrom" TEXT NOT NULL,
    "confirmedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "credentialShares" (
    "uuid" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL,
    "credentialUuid" TEXT NOT NULL,
    "temporaryPassword" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentialShares_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "credentialChanges" (
    "id" SERIAL NOT NULL,
    "credentialUuid" TEXT NOT NULL,
    "changedByUuid" TEXT NOT NULL,
    "changedFrom" TEXT NOT NULL,
    "changedTo" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,

    CONSTRAINT "credentialChanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentialChangeRequests" (
    "uuid" TEXT NOT NULL,
    "status" "CredentialChangeRequestStatus" NOT NULL,
    "requestedBy" TEXT NOT NULL,
    "confirmedBy" TEXT NOT NULL,
    "changedFrom" TEXT NOT NULL,
    "changedTo" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credentialChangeRequests_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "transactions" (
    "uuid" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "credentialUuid" TEXT NOT NULL,
    "fee" TEXT,
    "hash" TEXT,
    "hex" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_did_key" ON "credentials"("did");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_emailDomain_key" ON "institutions"("emailDomain");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES "institutions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
