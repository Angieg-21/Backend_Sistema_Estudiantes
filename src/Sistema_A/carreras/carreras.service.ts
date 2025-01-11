import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Semestre } from '../semestres/entities/semestre.entity';
import { Carrera } from './entities/carrera.entity';
import { Materia } from '../materias/entities/materia.entity';
import { Estudiante } from '../usuarios/components/estudiantes/entities/estudiante.entity';
import { Docente } from '../usuarios/components/docentes/entities/docente.entity';
import { Repository } from 'typeorm';
import { CreateSemestreDto } from '../semestres/dto/create-semestre.dto';
import { CarreraRepository } from './carreras.repository';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private   readonly carreraRepository:CarreraRepository,
  ) {



  }


  async getAll(): Promise<Carrera[]> {
    const list = await this.carreraRepository.find();
    if (!list.length) {
        throw new NotFoundException(new MessageDto('la lista está vacía'));
    }
    return list;
}

async findById(id: number): Promise<Carrera> {
  const carrera = await this.carreraRepository.findOne({ where: { id } });
  if (!carrera) {
      throw new NotFoundException(new MessageDto('no existe'));
  }
  return carrera;
}

async findByNombre(nombre: string): Promise<Carrera> {
  const carrera = await this.carreraRepository.findOne({where:{nombreCarrera:nombre }});
  return carrera;
}


async create(dto: CreateCarreraDto): Promise<any> {
  const exists = await this.findByNombre(dto.nombreCarrera);
  if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
  const carrera = this.carreraRepository.create(dto);
  await this.carreraRepository.save(carrera);
  return new MessageDto(`Carrera ${carrera.nombreCarrera} creado`);
}




}
