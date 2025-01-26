import { PayloadInterface, PayloadInterfaceDocente, PayloadInterfaceEstudiante } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/Sistema_A/usuarios/entities/usuario.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { RolRepository } from 'src/Sistema_A/roles/roles.repository';
import { MessageDto } from 'src/common/message.dto';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { LoginUsuarioDto } from './dto/login.dto';
import { NombreRoles } from 'src/Sistema_A/roles/roles.enum';
import { TokenDto } from './dto/token.dto';
import { compare } from 'bcrypt';
import { LoginEstudianteDto } from './dto/login-estudiante';

import { AuthRepository } from './auth.repository';
import { DocenteRepository } from 'src/Sistema_A/usuarios/components/docentes/docentes.repository';
import { EstudiantesRepository } from 'src/Sistema_A/usuarios/components/estudiantes/estudiantes.repository';
import { LoginDocenteDto } from './dto/login-docente';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Role)
        private readonly rolRepository: RolRepository,
        @InjectRepository(Usuario)
        private readonly authRepository: AuthRepository,
        @InjectRepository(Docente)
        private readonly docenteRepository: DocenteRepository,
        @InjectRepository(Estudiante)
        private readonly authRepositoryEstudiante: EstudiantesRepository,
        private readonly jwtService: JwtService
    ) {}

    async getall(): Promise<Usuario[]> {
        const usuarios = await this.authRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios;
    }

 
    async login(dto: LoginUsuarioDto): Promise<any> {
        const {nombreUsuario} = dto;
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}, {email: nombreUsuario}]});
        if(!usuario) return new UnauthorizedException(new MessageDto('no existe el usuario'));
        const passwordOK = await compare(dto.password, usuario.password);
        if(!passwordOK) return new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterface = {
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            email: usuario.email,
            roles: usuario.roles.map(rol => rol.rolNombre as NombreRoles)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }


    async logindocente(dto: LoginDocenteDto): Promise<any> {
        const {nombreDocente} = dto;
        const docente = await this.docenteRepository.findOne({where: [{nombre: nombreDocente}, {email: nombreDocente}]});
        if (!docente) throw new UnauthorizedException(new MessageDto('no existe el docente'));
        const passwordOK = await compare(dto.password, docente.password);
        if (!passwordOK) throw new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterfaceDocente = {
            id: docente.id,
            nombredocente: docente.nombre,
            emailDocente: docente.email,
            roles: docente.roles.map(rol => rol.rolNombre as string)
        };
        const token = await this.jwtService.sign(payload);
        return {token};
    }
    

    async loginestudiante(dto: LoginEstudianteDto): Promise<any> {
        const {nombreUsuario} = dto;
        const estudiante = await this.authRepositoryEstudiante.findOne({where: [{nombres: nombreUsuario}, {email: nombreUsuario}]});
        if(!estudiante) return new UnauthorizedException(new MessageDto('no existe el estudiante'));
        const passwordOK = await compare(dto.password, estudiante.password);
        if(!passwordOK) return new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterfaceEstudiante = {
            id: estudiante.id,
            nombresestudiantes: estudiante.nombres,
            emaileEstudiante: estudiante.email,
            roles: estudiante.roles.map(rol => rol.rolNombre as NombreRoles)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }


    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        const payload: PayloadInterface = {
            id: usuario[`id`],
            nombreUsuario: usuario[`nombreUsuario`],
            email: usuario[`email`],
            roles: usuario[`roles`]
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
    
}
