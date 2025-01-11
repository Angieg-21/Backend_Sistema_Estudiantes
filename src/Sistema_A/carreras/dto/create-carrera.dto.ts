import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSemestreDto } from '../../semestres/dto/create-semestre.dto'; // Importa el DTO correspondiente para Semestre
import { CreateMateriaDto } from '../../materias/dto/create-materia.dto'; // Importa el DTO correspondiente para Materia
import { CreateEstudianteDto } from '../../usuarios/components/estudiantes/dto/create-estudiante.dto'; // Importa el DTO correspondiente para Estudiante
import { CreateDocenteDto } from '../../usuarios/components/docentes/dto/create-docente.dto'; // Importa el DTO correspondiente para Docente
import { IsNotBlank } from 'src/Sistema_A/decorators/is-not-blank.decorator';

export class CreateCarreraDto {
 
  @IsNotBlank({message: 'el nombre no puede estar vacío'})
  nombreCarrera: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

}
