import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from './../config/constants';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from 'src/Sistema_A/usuarios/entities/usuario.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { AuthRepository } from './auth.repository';
import { DocenteRepository } from 'src/Sistema_A/usuarios/components/docentes/docentes.repository';
import { EstudiantesRepository } from 'src/Sistema_A/usuarios/components/estudiantes/estudiantes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario,Docente,Estudiante ,Role,AuthRepository,DocenteRepository,EstudiantesRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: 20
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
