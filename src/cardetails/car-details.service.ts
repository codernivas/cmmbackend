import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassDetails } from './car-details.schema';
import { CreateClassDetailDto } from './dto/create-car-detail.dto';
import { UpdateClassDetailDto } from './dto/update-car-detail.dto';

@Injectable()
export class ClassDetailsService {
  constructor(
    @InjectModel(ClassDetails.name) private readonly classDetailsModel: Model<ClassDetails>,
  ) {}

  async findAll(): Promise<ClassDetails[]> {
    return this.classDetailsModel.find().exec();
  }

  async filter(filters: {
    carType?: string;
    seatCapacity?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ClassDetails[]> {
    const query: any = {};
  
    // Add filters only if they are provided
    if (filters.carType) query.car_type = filters.carType;
    if (filters.seatCapacity) query.seat_capacity = filters.seatCapacity;
  
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.$expr = { $and: [] };
  
      // Cast `price` to a number for comparison
      if (filters.minPrice !== undefined) {
        query.$expr.$and.push({ $gte: [{ $toDouble: "$price" }, filters.minPrice] });
      }
      if (filters.maxPrice !== undefined) {
        query.$expr.$and.push({ $lte: [{ $toDouble: "$price" }, filters.maxPrice] });
      }
    }
  
    // Find and return matching records
    return this.classDetailsModel.find(query).exec();
  }
  
  
  

  async findById(id: string): Promise<ClassDetails> {
    const classDetail = await this.classDetailsModel.findById(id).exec();
    if (!classDetail) throw new NotFoundException(`Class detail with id ${id} not found`);
    return classDetail;
  }

  async create(createDto: CreateClassDetailDto): Promise<ClassDetails> {
    const newClassDetail = new this.classDetailsModel(createDto);
    return newClassDetail.save();
  }

  async update(id: string, updateDto: UpdateClassDetailDto): Promise<ClassDetails> {
    const updatedClassDetail = await this.classDetailsModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updatedClassDetail)
      throw new NotFoundException(`Class detail with id ${id} not found`);
    return updatedClassDetail;
  }

  async delete(id: string): Promise<void> {
    const result = await this.classDetailsModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Class detail with id ${id} not found`);
  }
}
