import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDetailDto } from './create-car-detail.dto';

export class UpdateClassDetailDto extends PartialType(CreateClassDetailDto) {}
