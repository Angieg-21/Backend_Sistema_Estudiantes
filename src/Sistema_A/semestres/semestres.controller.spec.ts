import { Test, TestingModule } from '@nestjs/testing';
import { SemestresController } from './semestres.controller';
import { SemestresService } from './semestres.service';

describe('SemestresController', () => {
  let controller: SemestresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemestresController],
      providers: [SemestresService],
    }).compile();

    controller = module.get<SemestresController>(SemestresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
