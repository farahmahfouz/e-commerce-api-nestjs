import { IsString, IsNotEmpty, MinLength, IsNumber, Min, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRequestProductDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  titleNeed: string;

  @IsString({ message: 'Details must be a string' })
  @MinLength(10, { message: 'Details must be at least 10 characters' })
  @IsNotEmpty({ message: 'Details are required' })
  details: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1 product' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @IsString({ message: 'Category must be a string' })
  @IsOptional()
  category: string;
}
