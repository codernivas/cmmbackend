// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HomeBannerModule } from './banner/homeBanner.module';
import { ClassDetailsModule } from './cardetails/car-details.module';
import { CarModule } from './homeList/home-list.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nivasofficial97:CEFYEU6NN5N1dn9d@cluster0.6bnxm.mongodb.net/',
    ), // MongoDB URL
    AuthModule,
    CarModule,
    ClassDetailsModule,
    HomeBannerModule,
  ],
})
export class AppModule {}
