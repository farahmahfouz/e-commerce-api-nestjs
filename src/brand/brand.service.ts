import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './brand.schema';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) { }

  async create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand = await this.brandModel.findOne({ name });
    if (brand) {
      throw new HttpException('Brand already exists', 400);
    }
    const newBrand = await this.brandModel.create(createBrandDto);
    return {
      status: 'success',
      message: 'Brand created successfully',
      data: newBrand,
    }
  }

  async findAll() {
    const brands = await this.brandModel.find().select('-__v');
    return {
      status: 'success',
      message: 'Brands fetched successfully',
      results: brands.length,
      data: brands,
    }
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).select('-__v');
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return {
      status: 'success',
      message: 'Brand fetched successfully',
      data: brand,
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    const updatedBrand = await this.brandModel.findByIdAndUpdate(id, updateBrandDto, { new: true });

    return {
      status: 'success',
      message: 'Brand updated successfully',
      data: updatedBrand,
    }
  }

  async remove(id: string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    await this.brandModel.findByIdAndDelete(id);
    return {
      status: 'success',
      message: 'Brand deleted successfully',
    }
  }
}
