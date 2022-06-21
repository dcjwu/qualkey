import { ForbiddenException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response, Request } from "express";

import { UserNotFoundException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import {
  AuthCheckCredentialsRequestDto,
  AuthOtpRequestDto,
  AuthRequestDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
} from "./dto";
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
  ) {
  }

  /**
     * User registration.
     * @desc Registers user or throws error if email already exists.
     * @param dto {AuthRequestDto} Validates data in request.
     * @returns New user.
     * @throws If email already exists.
     */
  public async register(dto: AuthRequestDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    const hash = AuthService.hashData(dto.password);

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
  public async login(dto: AuthRequestDto, response: Response): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnprocessableEntityException("Invalid credentials");

    const isFirstLogin = null === user.lastLoginAt;

    const pwMatches = await bcrypt.compareSync(dto.password, user.password);
    if (!pwMatches) throw new UnprocessableEntityException("Invalid credentials");

    const frontendDomain = this.config.get<string>("FRONTEND_DOMAIN");
    const jwtToken = await this.signToken(user.uuid, user.email, user.role, dto.rememberMe);
    response.cookie("jwt", jwtToken, { httpOnly: true, domain: frontendDomain });
    response.cookie("first_login", isFirstLogin, { httpOnly: false, domain: frontendDomain });

    await this.prisma.user.update({ data: { lastLoginAt: new Date() }, where: { email: user.email } });

    return this.routeProvider.onLogin(user);
  }

  /**
   * User login with OTP.
   */
  public async loginOtp(dto: AuthOtpRequestDto, response: Response): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UserNotFoundException(dto.email);

    const isFirstLogin = null === user.lastLoginAt;

    const frontendDomain = this.config.get<string>("FRONTEND_DOMAIN");
    const jwtToken = await this.signToken(user.uuid, user.email, user.role);
    response.cookie("jwt", jwtToken, { httpOnly: true, domain: frontendDomain });
    response.cookie("first_login", isFirstLogin, { httpOnly: false, domain: frontendDomain });

    await this.prisma.user.update({ data: { lastLoginAt: new Date() }, where: { email: user.email } });

    return this.routeProvider.onLogin(user);
  }

  /**
     * Check user credentials
     */
  public async checkCredentials(dto: AuthCheckCredentialsRequestDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnprocessableEntityException("Invalid credentials");

    const pwMatches = await bcrypt.compareSync(dto.password, user.password);
    if (!pwMatches) throw new UnprocessableEntityException("Invalid credentials");
  }

  /**
     * Logout user
     */
  async logout(response: Response): Promise<string> {
    const frontendDomain = this.config.get<string>("FRONTEND_DOMAIN");
    response.cookie("jwt", "", { httpOnly: true, domain: frontendDomain });
    return "/";
  }

  /**
     * Check if user got valid JWT
     */
  async checkJwt(request: Request): Promise<string> {
    const secret = this.config.get<string>("JWT_SECRET");
    try {
      const isJwtValid = await this.jwt.verify(request.cookies.jwt, { secret });
      if (isJwtValid) return JSON.stringify({ redirectTo: "/dashboard" });
    } catch (error) {
      return JSON.stringify({ redirectTo: "" });
    }
  }

  /**
     * Reset user password
     */
  public async resetPassword(dto: ResetPasswordRequestDto, email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (! user) throw new UserNotFoundException(email);

    // check if old password match
    const pwMatches = await bcrypt.compareSync(dto.oldPassword, user.password);
    if (!pwMatches) throw new UnprocessableEntityException("Wrong password");

    // encrypt password and save
    await this.prisma.user.update({
      data: { password: await bcrypt.hashSync(dto.newPassword, bcrypt.genSaltSync(10)) },
      where: { email: user.email },
    });
  }

  /**
   * Forgot user password logic
   */
  public async forgotPassword(dto: ForgotPasswordRequestDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (! user) throw new UserNotFoundException(dto.email);

    // encrypt password and save
    await this.prisma.user.update({
      data: { password: await bcrypt.hashSync(dto.newPassword, bcrypt.genSaltSync(10)) },
      where: { email: user.email },
    });
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
  private async signToken(userId: string, email: string, role: Role, rememberMe?: boolean): Promise<string> {
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

  private static hashData(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
  }
}