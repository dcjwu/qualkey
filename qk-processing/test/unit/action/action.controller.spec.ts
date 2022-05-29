import { Test, TestingModule } from "@nestjs/testing";

import { ActionController } from "../../../src/action/action.controller";

describe("ActionController", () => {
  let controller: ActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ controllers: [ActionController] }).compile();

    controller = module.get<ActionController>(ActionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
