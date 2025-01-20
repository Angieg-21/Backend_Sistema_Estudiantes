import { Docente } from "src/Sistema_A/usuarios/components/docentes/entities/docente.entity";
import { Estudiante } from "src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity";
import { Usuario } from "src/Sistema_A/usuarios/entities/usuario.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {}
