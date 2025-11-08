import { IsString, MinLength, MaxLength, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateSupplierDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(100, { message: 'Name must be at most 100 characters' })
    name: string;

    @IsString({ message: 'Website must be a string' })
    @IsNotEmpty()
    @IsUrl({}, { message: 'Website must be a valid URL' })
    website: string;
}
