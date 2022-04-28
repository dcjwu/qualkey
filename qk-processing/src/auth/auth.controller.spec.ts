import { Test } from "@nestjs/testing";
import { response } from "express";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

describe("AuthController", () => {
  let authController: AuthController;
  let spyService: AuthService;
  
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => []),
        register: jest.fn(() => []),
      }),
    };
      
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApiServiceProvider],
    }).compile();
    
    authController = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  describe("/register", () => {
    const dto = new AuthDto();
    it("Register method should not be null", () => {
      expect(authController.register(dto)).not.toEqual(null);
    });

    it("Should call register method", () => {
      authController.register(dto);
      expect(spyService.register).toBeDefined();
      expect(spyService.register).toHaveBeenCalled();
      expect(spyService.register).toHaveBeenCalledWith(dto);
      expect(spyService.register).toHaveBeenCalledTimes(1);
    });
  });

  describe("/login", () => {
    const dto = new AuthDto();
    it("Login method should not be null", () => {
      expect(authController.login(dto, response)).not.toEqual(null);
    });
    
    it("Should call login method", () => {
      authController.login(dto, response);
      expect(spyService.login).toBeDefined();
      expect(spyService.login).toHaveBeenCalled();
      expect(spyService.login).toHaveBeenCalledWith(dto, response);
      expect(spyService.login).toBeCalledTimes(1);
    });
  });
});