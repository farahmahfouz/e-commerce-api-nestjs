import { HttpException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }

  async signUp(createAuthDto: SignUpDto) {
    const user = await this.userModel.findOne({ email: createAuthDto.email });

    if (user) {
      throw new HttpException('User already exists', 400);;
    }

    const newUser = await this.userModel.create(createAuthDto);
    const payload = { _id: newUser._id, role: newUser.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

    return {
      status: 'success',
      message: 'User created successfully',
      token,
      data: { user: newUser },
    }

  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    if (!email || !password) {
      throw new HttpException('Email and password are required', 400);
    }

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user || !(await (user as any).correctPassword(password, user.password))) {
      throw new HttpException('Invalid email or password', 401);
    }
    const payload = { _id: user._id, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

    return {
      status: 'success',
      message: 'User signed in successfully',
      token,
      data: { user },
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
