import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Carrera])],
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}
