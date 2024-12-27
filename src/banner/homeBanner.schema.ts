// src/schema/HomeBanner.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HomeBanner extends Document {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const HomeBannerSchema = SchemaFactory.createForClass(HomeBanner);
