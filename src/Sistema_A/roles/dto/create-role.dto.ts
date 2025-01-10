import { IsEnum } from "@nestjs/class-validator";
import { Role } from "../entities/role.entity";
import { NombreRoles } from "../roles.enum";

export class CreateRoleDto {



    @IsEnum(Role, {message: 'El rol sólo puede ser user o admin'})
    rolNombre:NombreRoles;
}
