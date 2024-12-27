import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModel, CarSchema } from './home-list.schema'; // Import the CarModel here
import { CarController } from './home-list.controller';
import { CarService } from './home-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]), // Register schema correctly
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
