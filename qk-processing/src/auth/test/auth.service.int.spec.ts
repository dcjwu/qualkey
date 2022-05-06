import { Test } from "@nestjs/testing";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth.service";
import { AuthDto } from "../dto";

describe("AuthService Int", () => {
  let prisma: PrismaService;
  let authService: AuthService;

  const newUserMock: AuthDto = {
    email: "email@email.com",
    password: "password",
    rememberMe: false,
  };
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    authService = moduleRef.get<AuthService>(AuthService);
    await prisma.cleanDatabase();
  });

  describe("Register User", () => {
    it("Should create a new user", async() => {
      const user = await authService.register(newUserMock);
      expect(user.email).toBe("email@email.com");
    });
    it("Should throw an error on duplicate email", async () => {
      try {
        await authService.register(newUserMock);
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
  });

  // describe("Login User", () => {
  //   it("Should login existent user", async () => {
  //     const user = await authService.login(newUserMock, response);
  //   });
  // });
  
});