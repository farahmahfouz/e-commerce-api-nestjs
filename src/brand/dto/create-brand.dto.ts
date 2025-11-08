import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateBrandDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(100, { message: 'Name must be at most 100 characters long' })
    name: string;

    @IsString({ message: 'Image must be a string' })
    @IsOptional()
    @IsUrl({}, { message: 'Image must be a valid URL' })
    image?: string;
}
