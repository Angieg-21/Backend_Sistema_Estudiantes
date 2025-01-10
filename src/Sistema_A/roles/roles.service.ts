import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolRepository } from './roles.repository';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class RolesService {
  constructor (@InjectRepository (Role) 
  private readonly rolrepository:RolRepository){

  }

  async getAll():Promise<Role[]>{
    const roles = await this.rolrepository.find()

    if(!roles.length){
      throw new BadRequestException(new MessageDto('No hay roles'))

    }

    return roles;
  }


  async create (dto:CreateRoleDto):Promise<any>{

    const exist =await this.rolrepository.findOne({where:{rolNombre: dto.rolNombre}});
    if(exist){

      throw new BadRequestException(new MessageDto('El rol ya existe'))


    }
    await this.rolrepository.save(dto as Role )
  }
}
