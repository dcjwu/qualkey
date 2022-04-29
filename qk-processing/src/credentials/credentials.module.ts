import { Module } from "@nestjs/common";

import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, PrismaService],
})
export class CredentialsModule {}
