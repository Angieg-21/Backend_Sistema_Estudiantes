import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Carrera } from './entities/carrera.entity';

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carreraService: CarrerasService) {}

  @Get()
  async getAll() {
      return await this.carreraService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
      return await this.carreraService.findById(id);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  async create(@Body() dto: CreateCarreraDto) {
      return await this.carreraService.create(dto);
  }

}
