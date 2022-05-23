import { GoneException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OneTimePassword, User } from "@prisma/client";

import { OtpResponseDto } from "../../../src/auth/dto";
import { OtpService } from "../../../src/auth/otp.service";
import { AwsSesService } from "../../../src/aws/aws.ses.service";
import { UserNotFoundException } from "../../../src/common/exception";
import { PrismaService } from "../../../src/prisma/prisma.service";

describe("OtpService Unit Test", () => {
  let service: OtpService;
  let prismaService: PrismaService;
  let ses: AwsSesService;
  
  const otpMock: OneTimePassword = {
    uuid: "baa3261d-b36a-4d5d-9f26-5fce27321df8",
    code: "3540",
    validUntil: new Date(1752996087 * 1000),
    canBeResentAt: new Date(1652991260 * 1000),
  };

  const otpMockExpired: OneTimePassword = {
    uuid: "baa3261d-b36a-4d5d-9f26-5fce27321df8",
    code: "3540",
    validUntil: new Date(1652991131 * 1000),
    canBeResentAt: new Date(1652991260 * 1000),
  };
  
  const userMockFindUnique: User = {
    uuid: "e7c66694-648e-4195-9558-b27b1a061512",
    email: "email@email.com",
    password: "123",
    role: "STUDENT",
    createdAt: new Date(1652991260 * 1000),
    updatedAt: new Date(1652991260 * 1000),
    lastLoginAt: null,
    firstName: "A",
    lastName: "K",
    institutionUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpService, {
        provide: PrismaService,
        useValue: {
          oneTimePassword: {
            findUnique: jest.fn().mockReturnValue(Promise.resolve(otpMock)),
            create: jest.fn().mockReturnValue(Promise.resolve(otpMock)),
            delete: jest.fn(),
          }, 
          user: { findUnique: jest.fn().mockReturnValue(Promise.resolve(userMockFindUnique)) },
        },
      },
      {
        provide: AwsSesService,
        useValue: { sendOtpEmail: jest.fn() }, 
      },
      ],
    }).compile();

    service = module.get<OtpService>(OtpService);
    prismaService = module.get<PrismaService>(PrismaService);
    ses = module.get<AwsSesService>(AwsSesService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sendOtp() - unit", () => {

    //TODO: Make it work again

    // it("Should send email and return OtpResponseDto", async () => {
    //   await service.sendOtp(userMockFindUnique.email, 1);
    //   expect(ses.sendOtpEmail).toBeCalledTimes(1);
    //   expect(ses.sendOtpEmail).toBeCalledWith(userMockFindUnique.email, otpMock.code);
    //   expect(await service.sendOtp(userMockFindUnique.email, 1)).toEqual(
    //     new OtpResponseDto(otpMock.uuid, otpMock.validUntil, otpMock.canBeResentAt),
    //   );
    // });

    it("Should throw UserNotFoundException if user not found", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(null));
      jest
        .spyOn(prismaService.user, "findUnique")
        .mockImplementation(mockPrismaFindUnique);
      
      expect(async () => await service.sendOtp(userMockFindUnique.email, 1)).rejects.toThrowError(
        new UserNotFoundException(userMockFindUnique.email),
      );
    });
  });

  describe("checkOtp() - unit", () => {

    it("Should check if code is correct", async () => {
      await service.checkOtp(otpMock.code, otpMock.uuid);
      expect(prismaService.oneTimePassword.delete).toBeCalledTimes(1);
    });

    it("Should throw NotFoundException if code not found", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(null));
      jest
        .spyOn(prismaService.oneTimePassword, "findUnique")
        .mockImplementation(mockPrismaFindUnique);

      expect(async () => await service.checkOtp(otpMock.code, otpMock.uuid)).rejects.toThrowError(
        new NotFoundException("code not found"),
      );
    });

    it("Should throw GoneException if code expired", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(otpMockExpired));
      jest
        .spyOn(prismaService.oneTimePassword, "findUnique")
        .mockImplementation(mockPrismaFindUnique);
      
      expect(async () => await service.checkOtp(otpMockExpired.code, otpMockExpired.uuid)).rejects.toThrowError(
        new GoneException("code expired"),
      );
    });

    it("Should throw UnprocessableEntityException if code incorrect", () => {
      expect(async () => await service.checkOtp("0000", otpMock.uuid)).rejects.toThrowError(
        new UnprocessableEntityException("incorrect code"),
      );
    });
  });
});