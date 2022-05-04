import { NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
export declare class RoleNotFoundException extends NotFoundException {
    constructor(role: Role);
}
