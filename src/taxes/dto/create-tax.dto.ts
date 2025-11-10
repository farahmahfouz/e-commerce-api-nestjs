import { IsNumber, Min, IsOptional } from 'class-validator';

export class CreateTaxDto {
    @IsNumber({}, { message: 'Tax price must be a number' })
    @Min(0, { message: 'Tax price cannot be negative' })
    @IsOptional()
    taxPrice?: number;

    @IsNumber({}, { message: 'Shipping price must be a number' })
    @Min(0, { message: 'Shipping price cannot be negative' })
    @IsOptional()
    shippingPrice?: number;
}
