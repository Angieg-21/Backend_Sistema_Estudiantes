import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  getAll() {
      return this.estudiantesService.getall();
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  create(@Body() dto: CreateEstudianteDto) {
      return this.estudiantesService.create(dto);
  }
}
