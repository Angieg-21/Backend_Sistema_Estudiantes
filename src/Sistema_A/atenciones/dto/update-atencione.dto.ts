import { PartialType } from '@nestjs/mapped-types';
import { CreateAtencioneDto } from './create-atencione.dto';

export class UpdateAtencioneDto extends PartialType(CreateAtencioneDto) {}
