import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { AwsSesService } from "../aws/aws.ses.service";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private readonly sesService: AwsSesService) {
  }

  @Get("me")
  async getMe(@GetUser() user: User): Promise<any> {
    // return this.sesService.createTemplate();
    // return this.sesService.sendWelcomeUserEmail("kkucenko.aleksejs@gmail.com", "AK", "lfdkgj");
    // return this.sesService.sendOtpEmail("kkucenko.aleksejs@gmail.com", "9909 ");
    return user;
  }
}
