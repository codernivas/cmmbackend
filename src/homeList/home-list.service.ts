import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './home-list.schema';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  // Method to get car details (only car_name, image, and seat_capacity)
  async getCarDetails(): Promise<any> {
    const cars = await this.carModel.find({}, 'car_name image seat_capacity'); // Fetch only required fields
    return {
      status: 'success',
      message: 'Class details retrieved successfully',
      count: cars.length,
      data: cars,
    };
  }
}
