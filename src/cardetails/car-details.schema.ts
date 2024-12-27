import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ClassDetails extends Document {
  @Prop()
  car_name: string;

  @Prop()
  rating: number;

  @Prop()
  total_reviews: number;

  @Prop()
  description: string;

  @Prop()
  car_type: string;

  @Prop()
  steering_type: string;

  @Prop()
  seat_capacity: string;

  @Prop()
  fuel_type: string;

  @Prop({ type: Number })
  price: number;

  @Prop()
  discount_price: number;

  @Prop([String]) // Accepts multiple images as an array
  banner_images: string[];

  @Prop([String]) // Accepts multiple images as an array
  sample_images: string[];

  @Prop()
  customer_review: {
    customer_name: string;
    profile_image: string;
    rating: number;
    description: string;
    date: string;
  }[];
}

export const ClassDetailsSchema = SchemaFactory.createForClass(ClassDetails);
