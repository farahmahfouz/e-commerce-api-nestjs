import { IsMongoId, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(30, { message: 'Name must be at most 30 characters' })
  name: string;

  @IsMongoId({ message: 'Invalid categoryId format' })
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: string;
}
