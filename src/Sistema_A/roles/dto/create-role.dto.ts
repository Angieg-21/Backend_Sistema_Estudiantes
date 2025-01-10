import { IsEnum } from "@nestjs/class-validator";
import { Role } from "../entities/role.entity";
import { NombreRoles } from "../roles.enum";

export class CreateRoleDto {

    @IsEnum(NombreRoles, {message: 'El rol sólo puede ser   admin,estudiante y docente'})
    rolNombre:NombreRoles;
}
