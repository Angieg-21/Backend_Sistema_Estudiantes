import { IsInt, IsOptional, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCarreraDto } from '../../carreras/dto/create-carrera.dto'; // DTO de Carrera
import { CreateMateriaDto } from '../../materias/dto/create-materia.dto'; // DTO de Materia
import { CreateEstudianteDto } from '../../usuarios/components/estudiantes/dto/create-estudiante.dto'; // DTO de Estudiante
import { CreateDocenteDto } from '../../usuarios/components/docentes/dto/create-docente.dto'; // DTO de Docente

export class CreateSemestreDto {
  @IsInt()
  id: number;

  @IsInt()
  numero: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsArray()
  @Type(() => CreateCarreraDto)
  carreras: CreateCarreraDto[];

  @IsArray()
  @Type(() => CreateMateriaDto)
  materias: CreateMateriaDto[];

  @IsArray()
  @Type(() => CreateEstudianteDto)
  estudiantes: CreateEstudianteDto[];

  @IsArray()
  @Type(() => CreateDocenteDto)
  docentes: CreateDocenteDto[];
}
