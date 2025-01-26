import { Controller, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { LoginEstudianteDto } from './dto/login-estudiante';
import { LoginDocenteDto } from './dto/login-docente';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAll() {
        return this.authService.getall();
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('/login/admin')
    loginadmin(@Body() dto: LoginUsuarioDto) {
        return this.authService.login(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('/login/docente')
    logindocente(@Body() dto: LoginDocenteDto) {
        return this.authService.logindocente(dto);
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login/estudiante')
    loginestudiante(@Body() dto: LoginEstudianteDto) {
        return this.authService.loginestudiante(dto);
    }

    @Post('refresh')
    refresh(@Body() dto: TokenDto) {
        return this.authService.refresh(dto);
    }
}
