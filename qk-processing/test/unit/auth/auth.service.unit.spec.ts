import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { Role, User } from "@prisma/client";

import { PrismaService } from "../../../src/prisma/prisma.service";
import { AuthService } from "../../../src/auth/auth.service";
import { AuthDto } from "../../../src/auth/dto";
import { RouteProvider } from "../../../src/auth/provider";

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
    institutionUuid: "mock-uuid",
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

  // describe("login() - unit", () => {
  //   const userIncorrectPassword: AuthDto = {
  //     email: "email@email.com",
  //     password: "incorrect-pswrd",
  //     rememberMe: false,
  //   };
  //   it("Should login user and set jwt", async () => {
  //     expect(await service.login(userIncorrectPassword, response)).toHaveBeenCalled();
  //   });
  // });

  describe("signToken() - unit", () => {
    it("Should sign jwt for user", async () => {
      expect(await service.signToken("uuid123", "a@k.com", Role.STUDENT, true)).toEqual(mockSignToken);
    });
  });
});