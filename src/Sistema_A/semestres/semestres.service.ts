import { Injectable } from '@nestjs/common';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';

@Injectable()
export class SemestresService {
  create(createSemestreDto: CreateSemestreDto) {
    return 'This action adds a new semestre';
  }

  findAll() {
    return `This action returns all semestres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} semestre`;
  }

  update(id: number, updateSemestreDto: UpdateSemestreDto) {
    return `This action updates a #${id} semestre`;
  }

  remove(id: number) {
    return `This action removes a #${id} semestre`;
  }
}
