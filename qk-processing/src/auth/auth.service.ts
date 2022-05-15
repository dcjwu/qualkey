import { ForbiddenException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";

import { UserNotFoundException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import { AuthCheckCredentialsRequestDto, AuthRequestDto } from "./dto";
import { RouteProvider } from "./provider";

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

  /**
   * User registration.
   * @desc Registers user or throws error if email already exists.
   * @param dto {AuthRequestDto} Validates data in request.
   * @returns New user.
   * @throws If email already exists.
   */
  async register(dto: AuthRequestDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    const hash = this.hashData(dto.password);

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

  /**
   * User login.
   * @desc Log in user and set jwt in cookies or throws error if credentials does not match.
   * @param dto {AuthRequestDto} Validates data in request.
   * @param response {Response} Server response interface.
   * @returns Sets jwt in httpOnly cookie.
   * @throws If user does not exist or credentials are incorrect.
   */
  async login(dto: AuthRequestDto, response: Response): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UserNotFoundException("Invalid credentials");

    const pwMatches = await bcrypt.compareSync(dto.password, user.password);
    if (!pwMatches) throw new UnprocessableEntityException("Invalid credentials");

    const frontendDomain = this.config.get<string>("FRONTEND_DOMAIN");
    const jwtToken = await this.signToken(user.uuid, user.email, user.role, dto.rememberMe);
    response.cookie("jwt", jwtToken, { httpOnly: true, domain: frontendDomain });

    return this.routeProvider.onLogin(user);
  }

  /**
   * Check user credentials
   */
  async checkCredentials(dto: AuthCheckCredentialsRequestDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UserNotFoundException("Invalid credentials");

    const pwMatches = await bcrypt.compareSync(dto.password, user.password);
    if (!pwMatches) throw new UnprocessableEntityException("Invalid credentials");
  }

  /**
   * Signs jwt token.
   * @desc Signs new jwt token with data.
   * @param userId {string}
   * @param email {string}
   * @param role {Role}
   * @param rememberMe {boolean}
   * @returns Jwt token with particular expiration date.
   */
  async signToken(userId: string, email: string, role: Role, rememberMe: boolean): Promise<string> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const secret = this.config.get<string>("JWT_SECRET");
    const jwtShort = this.config.get<string>("JWT_EXPIRATION_SHORT");
    const jwtLong = this.config.get<string>("JWT_EXPIRATION_LONG");

    return this.jwt.signAsync(payload, {
      expiresIn: !rememberMe ? jwtShort : jwtLong,
      secret: secret,
    });
  }

  hashData(data: string):string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
  }
}