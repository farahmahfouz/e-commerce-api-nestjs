import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must be at most 100 characters long' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(20, { message: 'Description must be at least 20 characters long' })
  description: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(500, { message: 'Quantity must be at most 500' })
  quantity: number;

  @IsString({ message: 'Image cover must be a string' })
  @IsNotEmpty({ message: 'Image cover is required' })
  imageCover: string;

  @IsOptional()
  @IsArray({ message: 'Images must be an array of strings' })
  images?: string[];

  @IsOptional()
  @IsNumber({}, { message: 'Sold must be a number' })
  @Min(0, { message: 'Sold cannot be negative' })
  sold: number;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Discount price must be a number' })
  @Min(0, { message: 'Discount price must be positive' })
  priceAfterDiscount?: number;

  @IsOptional()
  @IsString({ message: 'Color must be a string' })
  color?: string;

  @IsMongoId({ message: 'Category must be a valid Mongo ID' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsOptional()
  @IsMongoId({ message: 'Subcategory must be a valid Mongo ID' })
  subCategory?: string;

  @IsOptional()
  @IsMongoId({ message: 'Brand must be a valid Mongo ID' })
  brand?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ratings average must be a number' })
  @Min(0, { message: 'Ratings average cannot be less than 0' })
  @Max(5, { message: 'Ratings average cannot be more than 5' })
  ratingsAvg?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Ratings quantity must be a number' })
  @Min(0, { message: 'Ratings quantity cannot be negative' })
  ratingsQty?: number;
}
