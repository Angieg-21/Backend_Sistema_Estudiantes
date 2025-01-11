import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { RolRepository } from 'src/Sistema_A/roles/roles.repository';
import { Usuario } from '../../entities/usuario.entity';
import { DocenteRepository } from './docentes.repository';
import { MessageDto } from 'src/common/message.dto';
import { NombreRoles } from 'src/Sistema_A/roles/roles.enum';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocentesService {
  
    constructor(
      @InjectRepository(Role)
      private readonly rolRepository: RolRepository,
      @InjectRepository(Docente)
      private readonly decenterepository : DocenteRepository
  ) {
  
  }
  
  async getall(): Promise<Docente[]> {
    const docentes = await this.decenterepository.find();
    if(!docentes.length) throw new NotFoundException(new MessageDto('No hay Docentes en la lista'));
    return docentes;
  }
  
    async create(dto: CreateDocenteDto): Promise<any> {
      const {nombreDocente, email} = dto;
      const exists = await this.decenterepository.findOne({where: [{nombre: nombreDocente}, {email: email}]});
      if(exists) throw new BadRequestException(new MessageDto('El Docente Ya Esta Registrado'));
      const rolDocente = await this.rolRepository.findOne({where: {rolNombre: NombreRoles.DOCENTE}});
      if(!rolDocente) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
      const docente = this.decenterepository.create(dto);
      docente.roles = [rolDocente];
      await this.decenterepository.save(docente);
      return new MessageDto('Docente creado');
  }
}
