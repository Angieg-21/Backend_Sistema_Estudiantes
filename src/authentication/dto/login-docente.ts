import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginDocenteDto {

    @IsNotBlank({message: 'E'})
    nombreDocente: string;
    @IsNotBlank({message: 'el nombre de usuario no puede estar vacío'})
    emailDocente: string;
    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    password: string;
}