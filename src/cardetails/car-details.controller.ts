import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClassDetailsService } from './car-details.service';
import { CreateClassDetailDto } from './dto/create-car-detail.dto';
import { UpdateClassDetailDto } from './dto/update-car-detail.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('class-details')
export class ClassDetailsController {
  constructor(private readonly classDetailsService: ClassDetailsService) {}

  private createResponse(
    message: string,
    data: any = [],
    count: number = Array.isArray(data) ? data.length : 1,
  ) {
    return {
      status: 'success',
      message,
      count,
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.classDetailsService.findAll();
    return this.createResponse('Class details retrieved successfully', data);
  }

  @Get('filter')
  async filter(
    @Query('car_type') carType?: string,
    @Query('seat_capacity') seatCapacity?: string,
    @Query('min_price') minPrice?: number,
    @Query('max_price') maxPrice?: number,
  ) {
    const filters = {
      carType,
      seatCapacity,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const filteredData = await this.classDetailsService.filter(filters);
    return {
      status: 'success',
      message: 'Filtered data retrieved successfully',
      count: filteredData.length,
      data: filteredData,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.classDetailsService.findById(id);
    return this.createResponse('Class detail retrieved successfully', data);
  }

  @Post()
  async create(@Body() createDto: CreateClassDetailDto) {
    const data = await this.classDetailsService.create(createDto);
    return this.createResponse('Class detail created successfully', data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateClassDetailDto,
  ) {
    const data = await this.classDetailsService.update(id, updateDto);
    return this.createResponse('Class detail updated successfully', data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.classDetailsService.delete(id);
    return this.createResponse('Class detail deleted successfully', null);
  }
}
