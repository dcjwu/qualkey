import { CredentialStatus, Prisma, PrismaClient, UserStatus } from "@prisma/client";

// Function definition that returns a partial structure
async function getCredentialWithEverything(uuid: string): Promise<any> {
  const prisma = new PrismaClient();
  return await prisma.credential.findFirst({
    where:{
      OR: [
        { uuid: uuid },
      ],
      NOT: { status: { equals: CredentialStatus.DELETED } },
    },
    include: {
      credentialChanges: { orderBy: { changedAt: "desc" } },
      institution: {
        include: {
          representatives: {
            where: { status: UserStatus.ACTIVE },
            select: {
              firstName: true,
              lastName: true,
              signatureUrl: true,
              title: true,
            },
          },
        },
      },
    },
  });
}

export type CredentialWithEverythingType = Prisma.PromiseReturnType<typeof getCredentialWithEverything>
