import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: {
        sub: string;
        email: string;
    }): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { uuid: payload.sub } });

    delete user.password;
    return user;
  }
}