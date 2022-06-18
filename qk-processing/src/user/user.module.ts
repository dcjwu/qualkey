import { Module } from "@nestjs/common";

import { AwsModule } from "../aws/aws.module";
import { PasswordGenerator } from "./helper/password-generator.service";
import { UserController } from "./user.controller";
import { UserFactory } from "./user.factory";
import { UserRepository } from "./user.repository";
import { UserSettingService } from "./user.setting.service";

@Module({
  imports: [AwsModule],
  controllers: [UserController],
  exports: [PasswordGenerator, UserFactory, UserRepository],
  providers: [PasswordGenerator, UserFactory, UserRepository, UserSettingService],
})
export class UserModule {}
