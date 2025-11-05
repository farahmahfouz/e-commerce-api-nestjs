import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(30, { message: 'Name must be at most 30 characters long' })
    name: string;

    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user' })
    @IsOptional()
    role: string;

    @IsString({ message: 'Avatar must be a string' })
    @IsOptional()
    @IsUrl({}, { message: 'Avatar must be a valid URL' })
    avatar?: string;

    @IsNumber({}, { message: 'Age must be a number' })
    @IsOptional()
    age?: number;

    @IsString({ message: 'Phone number must be a string' })
    @IsOptional()
    @IsPhoneNumber('EG', { message: 'Phone number must be a valid phone number' })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    address?: string;

    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean value' })
    isActive?: boolean;


    @IsOptional()
    @IsString({ message: 'Verification Code must be a string' })
    @Length(6, 6, { message: 'Verification Code must be 6 characters long' })
    verificationCode?: string;

    @IsOptional()
    @IsEnum(['male', 'female'], { message: 'Gender must be either male or female' })
    gender?: string;
}

export class SignInDto {
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}