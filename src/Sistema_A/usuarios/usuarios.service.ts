import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from '../roles/entities/role.entity';
import { RolRepository } from '../roles/roles.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { MessageDto } from 'src/common/message.dto';
import { NombreRoles } from '../roles/roles.enum';


@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Role)
    private readonly rolRepository: RolRepository,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: UsuarioRepository
) {

}

async getall(): Promise<Usuario[]> {
  const usuarios = await this.usuarioRepository.find();
  if(!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
  return usuarios;
}

  async create(dto: CreateAdminDto): Promise<any> {
    const {nombreUsuario, email} = dto;
    const exists = await this.usuarioRepository.findOne({where: [{nombreUsuario: nombreUsuario}, {email: email}]});
    if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
    const rolAdmin = await this.rolRepository.findOne({where: {rolNombre: NombreRoles.ADMIN}});
    const rolDocente = await this.rolRepository.findOne({where: {rolNombre: NombreRoles.DOCENTE}});
    const rolEstudiante = await this.rolRepository.findOne({where: {rolNombre: NombreRoles.ESTUDIANTE}});
    if(!rolAdmin || !rolDocente||!rolEstudiante) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
    const admin = this.usuarioRepository.create(dto);
    admin.roles = [rolAdmin, rolDocente,rolEstudiante];
    await this.usuarioRepository.save(admin);
    return new MessageDto('admin creado');
}

}
