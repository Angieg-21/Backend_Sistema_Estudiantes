import { Test, TestingModule } from '@nestjs/testing';
import { AtencionesController } from './atenciones.controller';
import { AtencionesService } from './atenciones.service';

describe('AtencionesController', () => {
  let controller: AtencionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtencionesController],
      providers: [AtencionesService],
    }).compile();

    controller = module.get<AtencionesController>(AtencionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
