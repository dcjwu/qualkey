import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { UserRepository } from "./user.repository";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userRepository: UserRepository) {
  }

  @Get("me")
  async getMe(@GetUser() user: User): Promise<any> {
    return this.userRepository.get(user.email);
  }
}
