import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HomeBannerService } from './homeBanner.service';
import { HomeBanner } from './homeBanner.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('home-banner')
export class HomeBannerController {
  constructor(private readonly homeBannerService: HomeBannerService) {}

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

  @Post()
  async create(@Body() body: Partial<HomeBanner>) {
    const newBanner = await this.homeBannerService.create(body);
    return this.createResponse('HomeBanner created successfully', newBanner);
  }

  @Get()
  async findAll() {
    const banners = await this.homeBannerService.findAll();
    return this.createResponse('List generated successfully', banners);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const banner = await this.homeBannerService.findById(id);
    return this.createResponse('HomeBanner fetched successfully', banner);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<HomeBanner>) {
    const updatedBanner = await this.homeBannerService.update(id, body);
    return this.createResponse(
      'HomeBanner updated successfully',
      updatedBanner,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.homeBannerService.delete(id);
    return this.createResponse('HomeBanner deleted successfully', null, 0);
  }
}
