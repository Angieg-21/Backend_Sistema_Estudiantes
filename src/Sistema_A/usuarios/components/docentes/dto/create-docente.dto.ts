import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/Sistema_A/decorators/is-not-blank.decorator";

export class CreateDocenteDto {


    @IsString()
        @MaxLength(10, {message: 'Nombre: longitud máxima de 10'})
        nombre: string;
    
        @IsNotBlank({message: 'El nombre del docente no puede estar vacío'})
        @MaxLength(10, {message: 'Nombre de usuario: longitud máxima de 10'})
        nombreDocente: string;
    
        @IsEmail()
        email: string;
    
        @IsNotBlank({message: 'La contraseña del Docente no puede estar vacía'})
        password: string;
}
