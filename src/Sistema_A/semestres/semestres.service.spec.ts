import { Test, TestingModule } from '@nestjs/testing';
import { SemestresService } from './semestres.service';

describe('SemestresService', () => {
  let service: SemestresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemestresService],
    }).compile();

    service = module.get<SemestresService>(SemestresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
