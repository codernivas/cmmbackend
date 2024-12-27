import { Schema, Document, model } from 'mongoose';

export interface Car extends Document {
  car_name: string;
  image: string;
  seat_capacity: number;
  description: string;
  steering_type: string;
}

export const CarSchema = new Schema<Car>(
  {
    car_name: { type: String, required: true },
    image: { type: String, required: true },
    seat_capacity: { type: Number, required: true },
    description: { type: String },
    steering_type: { type: String },
  },
  {
    collection: 'classdetails', // This will tell Mongoose to use the 'classdetails' collection
  },
);

export const CarModel = model<Car>('Car', CarSchema);
