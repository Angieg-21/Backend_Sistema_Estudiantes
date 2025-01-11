import { Usuario } from '../../entities/usuario.entity';
import { EntityRepository, Repository } from "typeorm";
import { Estudiante } from './entities/estudiante.entity';

@EntityRepository(Estudiante)
export class EstudiantesRepository extends Repository<Estudiante> {
    
}