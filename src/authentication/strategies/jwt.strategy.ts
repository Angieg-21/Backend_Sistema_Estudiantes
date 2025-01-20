import { MessageDto } from './../../common/message.dto';
import { JWT_SECRET } from './../../config/constants';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadInterface, PayloadInterfaceDocente, PayloadInterfaceEstudiante } from '../payload.interface';
import { Usuario } from 'src/Sistema_A/usuarios/entities/usuario.entity';
import { AuthRepository} from '../auth.repository';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { DocenteRepository } from 'src/Sistema_A/usuarios/components/docentes/docentes.repository';
import { EstudiantesRepository } from 'src/Sistema_A/usuarios/components/estudiantes/estudiantes.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Usuario)
        @InjectRepository(Docente)
        @InjectRepository(Estudiante)

        private readonly authRepository: AuthRepository,
        private readonly RepositoryDocente:DocenteRepository,
        private readonly RepositoryEstudiante: EstudiantesRepository,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface ,payloadd:PayloadInterfaceDocente,payloade:PayloadInterfaceEstudiante ) {
        const {nombreUsuario, email} = payload;
        const {nombredocente, emailDocente} = payloadd;
        const {nombresestudiantes, emaileEstudiante} = payloade;
        
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}, {email: email}]});
        const docente = await this.RepositoryDocente.findOne({where: [{nombre: nombredocente}, {email:emailDocente}]});
        const estudiante = await this.RepositoryEstudiante.findOne({where: [{nombres: nombresestudiantes}, {email: emaileEstudiante}]});

        if(!usuario || !docente || !estudiante ) return new UnauthorizedException(new MessageDto('credenciales erróneas'));
        return payload  || payloadd || payloade ;
    }
}