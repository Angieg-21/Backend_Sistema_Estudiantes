import { Injectable } from '@nestjs/common';
import { CreateAtencioneDto } from './dto/create-atencione.dto';
import { UpdateAtencioneDto } from './dto/update-atencione.dto';

@Injectable()
export class AtencionesService {
  create(createAtencioneDto: CreateAtencioneDto) {
    return 'This action adds a new atencione';
  }

  findAll() {
    return `This action returns all atenciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atencione`;
  }

  update(id: number, updateAtencioneDto: UpdateAtencioneDto) {
    return `This action updates a #${id} atencione`;
  }

  remove(id: number) {
    return `This action removes a #${id} atencione`;
  }
}
