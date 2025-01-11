import { Role} from '../roles/entities/role.entity';
import { EntityRepository, Repository } from "typeorm";
import { Carrera } from './entities/carrera.entity';

@EntityRepository(Carrera)
export class CarreraRepository extends Repository<Carrera> {}