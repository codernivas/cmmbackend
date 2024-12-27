// src/home-banner/home-banner.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeBanner, HomeBannerSchema } from './homeBanner.schema';
import { HomeBannerService } from './homeBanner.service';
import { HomeBannerController } from './homeBanner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomeBanner.name, schema: HomeBannerSchema },
    ]),
  ],
  controllers: [HomeBannerController],
  providers: [HomeBannerService],
})
export class HomeBannerModule {}
