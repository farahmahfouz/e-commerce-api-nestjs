import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestProductDto } from './dto/create-request-product.dto';
import { UpdateRequestProductDto } from './dto/update-request-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RequestProduct } from './request-product.schema';
import { Model } from 'mongoose';
import { count } from 'console';

@Injectable()
export class RequestProductService {
  constructor(@InjectModel(RequestProduct.name) private requestProductModel: Model<RequestProduct>) { }

  async create(createRequestProductDto: CreateRequestProductDto, userId: string) {
    const requestProduct = await this.requestProductModel.findOne({
      titleNeed: createRequestProductDto.titleNeed,
      user: userId
    });

    if (requestProduct) throw new HttpException('Request product already exists', 400);

    const newRequestProduct = (await this.requestProductModel.create({ ...createRequestProductDto, user: userId }));

    await newRequestProduct.populate('user', 'name email');

    return {
      status: 'success',
      message: 'Request product created successfully',
      data: newRequestProduct,
    }
  }

  async findAll() {
    const requestProducts = await this.requestProductModel.find().populate('user', 'name email');
    if (!requestProducts) throw new NotFoundException('No request products found');
    return {
      status: 'success',
      message: 'Request products retrieved successfully',
      count: requestProducts.length,
      data: requestProducts,
    }
  }

  async findOne(id: string) {
    const requestProduct = await this.requestProductModel.findById(id).populate('user', 'name email');
    if (!requestProduct) throw new NotFoundException('Request product not found');
    return {
      status: 'success',
      message: 'Request product retrieved successfully',
      data: requestProduct,
    }
  }

  async update(id: string, updateRequestProductDto: UpdateRequestProductDto, userId) {
    const requestProduct = await this.requestProductModel.findById(id);
    if (!requestProduct) throw new NotFoundException('Request product not found');
    const updatedRequestProduct = await this.requestProductModel.findByIdAndUpdate(id, { ...updateRequestProductDto, user: userId }, { new: true }).populate('user', 'name email');
    return {
      status: 'success',
      message: 'Request product updated successfully',
      data: updatedRequestProduct,
    }
  }

  async remove(id: string, userId) {
    const requestProduct = await this.requestProductModel.findById(id);
    if (!requestProduct) throw new NotFoundException('Request product not found');
    await this.requestProductModel.findByIdAndDelete(id, { user: userId });
    return {
      status: 'success',
      message: 'Request product deleted successfully',
    }
  }
}
