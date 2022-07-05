"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function getCredentialWithEverything(uuid) {
    const prisma = new client_1.PrismaClient();
    return await prisma.credential.findFirst({
        where: {
            OR: [
                { uuid: uuid },
            ],
            NOT: { status: { equals: client_1.CredentialStatus.DELETED } },
        },
        include: {
            credentialChanges: { orderBy: { createdAt: "desc" } },
            institution: {
                include: {
                    representatives: {
                        where: { status: client_1.UserStatus.ACTIVE },
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
//# sourceMappingURL=credential-with-everything.type.js.map