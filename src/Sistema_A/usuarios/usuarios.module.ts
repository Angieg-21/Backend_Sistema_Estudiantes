import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { Usuario } from './entities/usuario.entity';
import { DocentesModule } from './components/docentes/docentes.module';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Role])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
