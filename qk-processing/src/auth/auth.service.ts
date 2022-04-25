import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";

import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
  constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("User with email " + dto.email + " already exists");
        }
      }

      throw error;
    }
  }
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user)
      throw new ForbiddenException("User with such email is not registered");

    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!pwMatches)
      throw new ForbiddenException("Password incorrect");

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: secret,
    });

    return { access_token: token };
  }
}