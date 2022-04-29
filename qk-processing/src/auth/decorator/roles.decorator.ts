import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const Roles = (...roles: Role[]):CustomDecorator => SetMetadata("ROLES_KEY", roles);