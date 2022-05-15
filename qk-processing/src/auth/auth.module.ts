import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AwsModule } from "../aws/aws.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OtpService } from "./otp.service";
import { RouteProvider } from "./provider";
import { JwtStrategy } from "./strategy";

@Module({
  imports: [JwtModule.register({}), AwsModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RouteProvider, OtpService],
})
export class AuthModule {}