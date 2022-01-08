import { Test, TestingModule } from '@nestjs/testing';
import { AdminControllerController } from './admin-controller.controller';

describe('AdminControllerController', () => {
  let controller: AdminControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminControllerController],
    }).compile();

    controller = module.get<AdminControllerController>(AdminControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
