import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get()
  getAll() {
      return this.usuarioService.getall();
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  create(@Body() dto: CreateAdminDto) {
      return this.usuarioService.create(dto);
  }
}
