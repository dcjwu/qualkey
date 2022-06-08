import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { User, UserActions, UserActionType } from "@prisma/client";

import { ActionRepository } from "../../../src/action/action.repository";
import { ActionService } from "../../../src/action/action.service";
import { ActionDecisionDto } from "../../../src/action/dto/action.decision.dto";
import { Decision } from "../../../src/action/enum/decision.enum";
import { LogicException } from "../../../src/common/exception";
import { CredentialsChangeService } from "../../../src/credentials/credentials-change.service";
import { CredentialsService } from "../../../src/credentials/credentials.service";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { UploadService } from "../../../src/upload/upload.service";

describe("ActionService Unit Test", () => {
  let service: ActionService;
  let actionRepository: ActionRepository;
  let uploadService: UploadService;
  let credentialsService: CredentialsService;
  let credentialsChangeService: CredentialsChangeService;

  const mockUser: User = {
    uuid: "e7c66694-648e-4195-9558-b27b1a061512",
    email: "email@email.com",
    password: "123",
    role: "INSTITUTION_REPRESENTATIVE",
    createdAt: new Date(1652991260 * 1000),
    updatedAt: new Date(1652991260 * 1000),
    lastLoginAt: new Date(1652991260 * 1000),
    firstName: "",
    lastName: "",
    institutionUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
    currency: "",
    stripeCustomerId: "",
  };
  
  const mockGetActionByIdReviewUpload: UserActions = {
    id: 0,
    userUuid: mockUser.uuid,
    initiatorName: "AK",
    type: UserActionType.REVIEW_UPLOAD,
    subjectUuid: "c2699545-6c63-4719-93c9-8a6345ef0bbf",
    credentialsUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
    createdAt: new Date(1652991260 * 1000),
  };

  const mockGetActionByIdReviewWithdrawal: UserActions = {
    id: 0,
    userUuid: mockUser.uuid,
    initiatorName: "AK",
    type: UserActionType.REVIEW_WITHDRAWAL,
    subjectUuid: "c2699545-6c63-4719-93c9-8a6345ef0bbf",
    credentialsUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
    createdAt: new Date(1652991260 * 1000),
  };

  const mockGetActionByIdReviewChangeRequest: UserActions = {
    id: 0,
    userUuid: mockUser.uuid,
    initiatorName: "AK",
    type: UserActionType.REVIEW_CHANGE_REQUEST,
    subjectUuid: "c2699545-6c63-4719-93c9-8a6345ef0bbf",
    credentialsUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
    createdAt: new Date(1652991260 * 1000),
  };

  const mockUserNoMatch: User = {
    uuid: "7ce0026f-6701-4729-9ed1-ac2806634c0c",
    email: "email@email.com",
    password: "123",
    role: "INSTITUTION_REPRESENTATIVE",
    createdAt: new Date(1652991260 * 1000),
    updatedAt: new Date(1652991260 * 1000),
    lastLoginAt: new Date(1652991260 * 1000),
    firstName: "",
    lastName: "",
    institutionUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
    currency: "",
    stripeCustomerId: "",
  };
  
  const mockActionDecisionReviewUpload: ActionDecisionDto = {
    actionId: "1",
    subjectUuid: mockGetActionByIdReviewUpload.subjectUuid,
    type: mockGetActionByIdReviewUpload.type,
    decision: Decision.REJECT,
  };

  const mockActionDecisionReviewWithdrawal: ActionDecisionDto = {
    actionId: "1",
    subjectUuid: mockGetActionByIdReviewUpload.subjectUuid,
    type: UserActionType.REVIEW_WITHDRAWAL,
    decision: Decision.REJECT,
  };

  const mockActionDecisionReviewChangeRequest: ActionDecisionDto = {
    actionId: "1",
    subjectUuid: mockGetActionByIdReviewUpload.subjectUuid,
    type: UserActionType.REVIEW_CHANGE_REQUEST,
    decision: Decision.REJECT,
  };

  const mockActionDecisionNotImplemented = {
    actionId: "1",
    subjectUuid: mockGetActionByIdReviewUpload.subjectUuid,
    type: "new-random-type",
    decision: Decision.REJECT,
  };

  const mockActionSubjectNoMatch: ActionDecisionDto = {
    actionId: "1",
    subjectUuid: "3ce2ce11-18c4-44db-9bba-a260940163b5",
    type: mockGetActionByIdReviewUpload.type,
    decision: Decision.REJECT,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService, {
        provide: PrismaService,
        useValue: { userActions: { findUnique: jest.fn() } },
      },
      {
        provide: ActionRepository,
        useValue: { getById: jest.fn().mockReturnValue(Promise.resolve(mockGetActionByIdReviewUpload)) },
      },{
        provide: UploadService,
        useValue: { processDecisionForUpload: jest.fn() },
      }, {
        provide: CredentialsChangeService,
        useValue: { processCredentialsChangeRequestDecision: jest.fn() },
      }, {
        provide: CredentialsService,
        useValue: { processCredentialsWithdrawalDecision: jest.fn() },
      }],
    }).compile();

    service = module.get<ActionService>(ActionService);
    actionRepository = module.get<ActionRepository>(ActionRepository);
    uploadService = module.get<UploadService>(UploadService);
    credentialsService = module.get<CredentialsService>(CredentialsService);
    credentialsChangeService = module.get<CredentialsChangeService>(CredentialsChangeService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("processDecision() - unit", () => {
      
    it("Should throw ForbiddenException if user no match", () => {
      expect(async () => await service.processDecision(mockUserNoMatch, mockActionDecisionReviewUpload)).rejects.toThrowError(
        new ForbiddenException(),
      );
    });
    
    it("Should throw LogicException if action no match", () => {
      expect(async () => await service.processDecision(mockUser, mockActionDecisionReviewWithdrawal)).rejects.toThrowError(
        new LogicException("Action type should match"),
      );
    });

    it("Should throw LogicException if subject no match", () => {
      expect(async () => await service.processDecision(mockUser, mockActionSubjectNoMatch)).rejects.toThrowError(
        new LogicException("Action subject should match"),
      );
    });

    it("Should call processDecisionForUpload if type is REVIEW_UPLOAD", async () => {
      await service.processDecision(mockUser, mockActionDecisionReviewUpload);
      expect(uploadService.processDecisionForUpload).toBeCalledTimes(1);
      expect(uploadService.processDecisionForUpload).toBeCalledWith(
        mockGetActionByIdReviewUpload.subjectUuid, mockUser, mockGetActionByIdReviewUpload.id, mockActionDecisionReviewUpload.decision,
      );
    });
    
    it("Should call processCredentialsWithdrawalDecision if type is REVIEW_WITHDRAWAL", async () => {
      const mock = jest.fn().mockReturnValue(Promise.resolve(mockGetActionByIdReviewWithdrawal));
      jest
        .spyOn(actionRepository, "getById")
        .mockImplementation(mock);

      await service.processDecision(mockUser, mockActionDecisionReviewWithdrawal);
      expect(credentialsService.processCredentialsWithdrawalDecision).toBeCalledTimes(1);
      expect(credentialsService.processCredentialsWithdrawalDecision).toBeCalledWith(
        mockGetActionByIdReviewWithdrawal.subjectUuid, mockUser, mockGetActionByIdReviewWithdrawal.id, mockActionDecisionReviewWithdrawal.decision,
      );
    });
    
    it("Should call processCredentialsChangeRequestDecision if type is REVIEW_CHANGE_REQUEST", async () => {
      const mock = jest.fn().mockReturnValue(Promise.resolve(mockGetActionByIdReviewChangeRequest));
      jest
        .spyOn(actionRepository, "getById")
        .mockImplementation(mock);

      await service.processDecision(mockUser, mockActionDecisionReviewChangeRequest);
      expect(credentialsChangeService.processCredentialsChangeRequestDecision).toBeCalledTimes(1);
      expect(credentialsChangeService.processCredentialsChangeRequestDecision).toBeCalledWith(
        mockGetActionByIdReviewChangeRequest.subjectUuid, mockUser, mockGetActionByIdReviewChangeRequest.id, mockActionDecisionReviewChangeRequest.decision,
      );
    });
  });
});