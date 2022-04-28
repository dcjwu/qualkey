import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";

import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { RouteProvider } from "./helper/route-provider";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

@Injectable({})
export class AuthService {
  constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private routeProvider: RouteProvider,
  ) {}

  async register(dto: AuthDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role: Role.STUDENT,
        },
        select: {
          uuid: true,
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

  async login(dto: AuthDto, response: Response): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user)
      throw new ForbiddenException("Invalid credentials");

    const pwMatches = await bcrypt.compareSync(
      dto.password,
      user.password,
    );

    if (!pwMatches)
      throw new ForbiddenException("Invalid credentials");

    const frontendDomain = this.config.get<string>("FRONTEND_DOMAIN");
    const jwtToken = await this.signToken(user.uuid, user.email);
    response.cookie("jwt", jwtToken, { httpOnly: true, domain: frontendDomain });

    return this.routeProvider.onLogin(user);
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get("JWT_SECRET");

    return this.jwt.signAsync(payload, {
      expiresIn: "1h",
      secret: secret,
    });
  }
}