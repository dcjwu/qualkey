import { CustomDecorator } from "@nestjs/common";
import { Role } from "@prisma/client";
export declare const Roles: (...roles: Role[]) => CustomDecorator;
