import { Controller, Get, UseGuards } from '@nestjs/common';
import { CarService } from './home-list.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // Endpoint to get car details (car_name, image, seat_capacity)
  @Get('details')
  async getCarDetails() {
    return this.carService.getCarDetails();
  }
}
