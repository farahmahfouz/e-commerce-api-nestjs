import { HttpException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { stat } from 'fs';
import { count } from 'console';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    console.log(name)
    const category = await this.categoryModel.findOne({ name });
    console.log(category)
    if (category) {
      throw new HttpException('Category already exists', 400);
    }
    const newCategory = await this.categoryModel.create(createCategoryDto);
    console.log(newCategory)
    return {
      status: 'success',
      message: 'Category created successfully',
      data: { category: newCategory }
    }
  }

  async findAll(query) {
    const { name } = query
    const categories = await this.categoryModel.find(name ? { name: { $regex: name, $options: 'i' } } : {});
    return {
      status: 'success',
      message: 'Categories fetched successfully',
      count: categories.length,
      data: { categories }
    };
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      status: 'success',
      message: 'Category fetched successfully',
      data: { category }
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const UpdateCategory = await this.categoryModel.findByIdAndUpdate({ _id: id }, { $set: updateCategoryDto }, { new: true });
    return {
      status: 'success',
      message: 'Category updated successfully',
      data: { category: UpdateCategory }
    }
  }

  async remove(id: string) {
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryModel.deleteOne({ _id: id });
    return {
      status: 'success',
      message: 'Category deleted successfully',
    }
  }
}
