import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { RolRepository } from 'src/Sistema_A/roles/roles.repository';
import { Estudiante } from './entities/estudiante.entity';
import { EstudiantesRepository } from './estudiantes.repository';
import { MessageDto } from 'src/common/message.dto';
import { NombreRoles } from 'src/Sistema_A/roles/roles.enum';

@Injectable()
export class EstudiantesService {
  
      constructor(
        @InjectRepository(Role)
        private readonly rolRepository: RolRepository,
        @InjectRepository(Estudiante)
        private readonly estudianterepository : EstudiantesRepository
    ) {
    
    }
    
    async getall(): Promise<Estudiante[]> {
      const estudiante = await this.estudianterepository.find();
      if(!estudiante.length) throw new NotFoundException(new MessageDto('No hay Estudiantes en la lista'));
      return estudiante;
    }
    
      async create(dto: CreateEstudianteDto): Promise<any> {
        const {nombreEstudiante, email} = dto;
        const exists = await this.estudianterepository.findOne({where: [{nombres: nombreEstudiante}, {email: email}]});
        if(exists) throw new BadRequestException(new MessageDto('El Estudiante Ya Esta Registrado'));
        const rolEstudiante = await this.rolRepository.findOne({where: {rolNombre: NombreRoles.ESTUDIANTE}});
        if(!rolEstudiante ) throw new InternalServerErrorException(new MessageDto('El rol Estudiante aún no han sido creado'));
        const estudiante = this.estudianterepository.create(dto);
        estudiante.roles = [rolEstudiante];
        await this.estudianterepository.save(estudiante);
        return new MessageDto('Estudiante creado');
    }
}
