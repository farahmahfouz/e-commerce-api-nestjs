import { BadRequestException } from '@nestjs/common';
import { IsString, IsDateString, IsNumber, MinLength, MaxLength, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateCouponDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(100, { message: 'Name must be at most 100 characters' })
    name: string;

    @IsDateString({}, { message: 'Expiry date must be a valid date string' })
    @IsNotEmpty()
    @ValidateIf((o) => {
        if (new Date(o.expiryDate) < new Date()) {
            throw new BadRequestException('Expiry date cannot be in the past');
        }
        return true;
    })
    expiryDate: string;

    @IsNumber({}, { message: 'Discount must be a number' })
    @IsNotEmpty()
    discount: number;
}
