import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<{ status: number; message: string; data: User }> {
    const existUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existUser) {
      throw new HttpException('Email already exists', 400);
    }


    const user = {
      password: createUserDto.password,
      role: createUserDto.role || 'user',
      isActive: true,
    }

    return {
      status: 201,
      message: 'User created successfully',
      data: await this.userModel.create({ ...createUserDto, ...user }),
    }
  }

  async findAll(query: any): Promise<{ status: number; message: string; count: number; data: User[] }> {
    const { limit = 1000, skip = 0, sort = 'asc', name, email, role } = query;

    if (Number.isNaN(+limit) || Number.isNaN(+skip) || (sort && !['desc', 'asc'].includes(sort))) {
      throw new HttpException('Invalid query parameters', 400);
    }

    const filter: any = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = new RegExp(email, 'i');
    if (role) filter.role = new RegExp(role, 'i');


    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ name: sort })
      .select('-password -__v');

    return {
      status: 200,
      message: 'Users retrieved successfully',
      count: users.length,
      data: users
    };
  }

  async findOne(id: string): Promise<{ status: number; message: string; data: User }> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      status: 200,
      message: 'User found successfully',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ status: number; message: string; data: { user: User } }> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select('-password -__v');
    return {
      status: 200,
      message: 'User updated successfully',
      data: {
        user: updatedUser!
      },
    };
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
