import { Module } from '@nestjs/common';
import { AtencionesService } from './atenciones.service';
import { AtencionesController } from './atenciones.controller';

@Module({
  controllers: [AtencionesController],
  providers: [AtencionesService],
})
export class AtencionesModule {}
