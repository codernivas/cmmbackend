export class CreateClassDetailDto {
  car_name: string;
  rating: number;
  total_reviews: number;
  description: string;
  car_type: string;
  steering_type: string;
  seat_capacity: string;
  fuel_type: string;
  price: number;
  discount_price: number;
  banner_images: string[];
  sample_images: string[];
  customer_review: {
    customer_name: string;
    profile_image: string;
    rating: number;
    description: string;
    date: string;
  }[];
}
