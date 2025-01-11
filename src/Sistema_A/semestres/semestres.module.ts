import { Module } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { SemestresController } from './semestres.controller';

@Module({
  controllers: [SemestresController],
  providers: [SemestresService],
})
export class SemestresModule {}
