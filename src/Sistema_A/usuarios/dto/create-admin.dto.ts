import { IsEmail, IsString, MaxLength } from "@nestjs/class-validator";
import { IsNotBlank } from "src/Sistema_A/decorators/is-not-blank.decorator";

export class CreateAdminDto {
    @IsString()
    @MaxLength(10, {message: 'Nombre: longitud máxima de 10'})
    nombre: string;

    @IsNotBlank({message: 'El nombre de usuario no puede estar vacío'})
    @MaxLength(10, {message: 'Nombre de usuario: longitud máxima de 10'})
    nombreUsuario: string;

    @IsEmail()
    email: string;

    @IsNotBlank({message: 'La contraseña del usuario no puede estar vacía'})
    password: string;
}

