"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function getCredentialsWithCredentialChange() {
    const prisma = new client_1.PrismaClient();
    return await prisma.credential.findMany({ include: { credentialChanges: true } });
}
//# sourceMappingURL=credentials-with-credential-change.type.js.map