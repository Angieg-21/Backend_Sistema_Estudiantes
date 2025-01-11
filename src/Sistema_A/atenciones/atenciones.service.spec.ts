import { Test, TestingModule } from '@nestjs/testing';
import { AtencionesService } from './atenciones.service';

describe('AtencionesService', () => {
  let service: AtencionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtencionesService],
    }).compile();

    service = module.get<AtencionesService>(AtencionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
