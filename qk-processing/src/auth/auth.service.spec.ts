import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { Role, User } from "@prisma/client";
import { response } from "express";

import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { RouteProvider } from "./provider";

type CreateUser = {
  uuid: string
  email: string
  createdAt: Date
}

describe("AuthService Unit Test", () => {
  let service: AuthService;

  const mockCreateUser: CreateUser = {
    uuid: "uuid2",
    email: "email@email.com",
    createdAt: new Date(1651188244),
  };
  
  const mockFindUser: User = {
    uuid: "uuid",
    email: "email@email.com",
    password: "$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.",
    role: Role.STUDENT,
    createdAt: new Date(1651188244),
    updatedAt: new Date(1651188244),
    firstName: null,
    lastName: null,
  };

  const mockSignToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ConfigService, RouteProvider, {
        provide: PrismaService,
        useValue: {
          user: {
            create: jest.fn().mockReturnValue(Promise.resolve(mockCreateUser)),
            findUnique: jest.fn().mockReturnValue(Promise.resolve(mockFindUser)),
          },
        },
      }, {
        provide: JwtService,
        useValue: { signAsync: jest.fn().mockReturnValue(Promise.resolve(mockSignToken)) },
      },
      ],
    }).compile();
    
    service = module.get<AuthService>(AuthService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("register() - unit", () => {
    const newUser: AuthDto = {
      email: "email@email.com",
      password: "password",
      rememberMe: false,
    };
    it("Should register user and return it", async () => {
      expect(await service.register(newUser)).toEqual(mockCreateUser);
    });
  });

  describe("login() - unit", () => {
    const loginUser: AuthDto = {
      email: "email@email.com",
      password: "student",
      rememberMe: false,
    };
    it("Should login user", async () => {
      expect(await service.login(loginUser, response)).toEqual("");
    });
  });
});