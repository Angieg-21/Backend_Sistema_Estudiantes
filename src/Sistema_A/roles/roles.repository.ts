import { Role} from '../roles/entities/role.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Role)
export class RolRepository extends Repository<Role> {}