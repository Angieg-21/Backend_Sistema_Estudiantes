import { Usuario } from '../../entities/usuario.entity';
import { EntityRepository, Repository } from "typeorm";
import { Docente } from './entities/docente.entity';

@EntityRepository(Docente)
export class DocenteRepository extends Repository<Docente> {
    
}