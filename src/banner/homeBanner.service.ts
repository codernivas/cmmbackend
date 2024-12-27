// src/home-banner/home-banner.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomeBanner } from './homeBanner.schema';

@Injectable()
export class HomeBannerService {
  constructor(
    @InjectModel(HomeBanner.name) private homeBannerModel: Model<HomeBanner>,
  ) {}

  // Create a HomeBanner
  async create(data: Partial<HomeBanner>): Promise<HomeBanner> {
    const newBanner = new this.homeBannerModel(data);
    return await newBanner.save();
  }

  // Get all HomeBanners
  async findAll(): Promise<HomeBanner[]> {
    return await this.homeBannerModel.find().exec();
  }

  // Get a single HomeBanner by ID
  async findById(id: string): Promise<HomeBanner> {
    const banner = await this.homeBannerModel.findById(id).exec();
    if (!banner) {
      throw new NotFoundException(`HomeBanner with ID "${id}" not found`);
    }
    return banner;
  }

  // Update a HomeBanner by ID
  async update(id: string, data: Partial<HomeBanner>): Promise<HomeBanner> {
    const updatedBanner = await this.homeBannerModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedBanner) {
      throw new NotFoundException(`HomeBanner with ID "${id}" not found`);
    }
    return updatedBanner;
  }

  // Delete a HomeBanner by ID
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.homeBannerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HomeBanner with ID "${id}" not found`);
    }
    return { message: 'HomeBanner successfully deleted' };
  }
}
