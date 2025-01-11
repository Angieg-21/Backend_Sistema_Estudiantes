import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { EstudiantesRepository } from './estudiantes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from 'src/Sistema_A/carreras/entities/carrera.entity';
import { Semestre } from 'src/Sistema_A/semestres/entities/semestre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante,Role,Carrera,Semestre])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
