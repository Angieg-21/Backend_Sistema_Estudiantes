import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';

@Module({
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}
