import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
     
   @Get()
   getAll(){
    return this.rolesService.getAll
   }

   @UsePipes(new ValidationPipe({whitelist:true}))
   @Post()
   create(@Body() dto:CreateRoleDto){
    return this,this.rolesService.create(dto)
   }
  
}
