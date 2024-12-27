import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassDetails, ClassDetailsSchema } from './car-details.schema';
import { ClassDetailsController } from './car-details.controller';
import { ClassDetailsService } from './car-details.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClassDetails.name, schema: ClassDetailsSchema }])],
  controllers: [ClassDetailsController],
  providers: [ClassDetailsService],
})
export class ClassDetailsModule {}
