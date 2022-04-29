import { Test, TestingModule } from "@nestjs/testing";
import { response } from "express";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

type RegisterUser = {
    uuid: string
    email: string
    createdAt: Date
}

describe("AuthController Unit Test", () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn((): string => {
      return "/route-to-be-redirected";
    }),
    register: jest.fn(() => {
      return {
        uuid: "uuid",
        email: "email@email.com",
        createdAt: new Date(1651188244),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("/register endpoint - unit", () => {
    const newUser: AuthDto = {
      email: "email@email.com",
      password: "123",
    };
    const registeredUser: RegisterUser = {
      uuid: "uuid",
      email: "email@email.com",
      createdAt: new Date(1651188244),
    };
    it("Should register a user", () => {
      expect(controller.register(newUser)).toEqual(registeredUser);
      expect(mockAuthService.register).toHaveBeenCalledTimes(1);
    });
  });

  describe("/login endpoint - unit", () => {
    const existentUser: AuthDto = {
      email: "email@email.com",
      password: "123",
    };
    it("Should login a user", () => {
      expect(controller.login(existentUser, response)).toEqual("/route-to-be-redirected");
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });
  });
});