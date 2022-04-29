import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, PrismaService],
})
export class CredentialsModule {}
