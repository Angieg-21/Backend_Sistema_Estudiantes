import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { DocenteRepository } from './docentes.repository';
import { Docente } from './entities/docente.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Docente,Role,DocenteRepository])],
  controllers: [DocentesController],
  providers: [DocentesService],
})
export class DocentesModule {}
