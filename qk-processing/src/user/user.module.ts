import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { UserPasswordGenerator } from "./helper/user.password-generator";
import { UserController } from "./user.controller";
import { UserFactory } from "./user.factory";
import { UserRepository } from "./user.repository";

@Module({
  imports: [AwsModule],
  controllers: [UserController],
  exports: [UserPasswordGenerator, UserFactory, UserRepository],
  providers: [UserPasswordGenerator, UserFactory, UserRepository],
})
export class UserModule {}
