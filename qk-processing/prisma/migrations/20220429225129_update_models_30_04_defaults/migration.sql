-- AlterTable
ALTER TABLE "credentialChangeRequests" ALTER COLUMN "status" SET DEFAULT E'PENDING';

-- AlterTable
ALTER TABLE "credentialShares" ALTER COLUMN "viewsCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "institutions" ALTER COLUMN "status" SET DEFAULT E'ACTIVE',
ALTER COLUMN "logoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT E'NEW';

-- AlterTable
ALTER TABLE "uploads" ALTER COLUMN "status" SET DEFAULT E'PENDING';
