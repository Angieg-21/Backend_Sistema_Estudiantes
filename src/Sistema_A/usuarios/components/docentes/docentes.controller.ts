import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  
    @Get('/lista')
    getAll() {
        return this.docentesService.getall();
    }
  
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('/nuevo')
    create(@Body() dto: CreateDocenteDto) {
        return this.docentesService.create(dto);
    }
    
}
