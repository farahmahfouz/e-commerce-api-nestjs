import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubCategory } from './sub-category.schema';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Category } from 'src/category/category.schema';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, categoryId } = createSubCategoryDto;

    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const existingSub = await this.subCategoryModel.findOne({ name, categoryId });
    if (existingSub) {
      throw new HttpException('Subcategory already exists under this category', 400);
    }

    const newSubCategory = await this.subCategoryModel.create(createSubCategoryDto);

    return {
      status: 'success',
      message: 'Subcategory created successfully',
      data: { subCategory: newSubCategory },
    };
  }

  async findAll(query) {
    const { name } = query;

    const subCategories = await this.subCategoryModel
      .find(name ? { name: { $regex: name, $options: 'i' } } : {})
      .populate('categoryId', 'name');

    return {
      status: 'success',
      message: 'Subcategories fetched successfully',
      count: subCategories.length,
      data: { subCategories },
    };
  }

  async findOne(id: string) {
    const subCategory = await this.subCategoryModel
      .findById(id)
      .populate('categoryId', 'name');

    if (!subCategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return {
      status: 'success',
      message: 'Subcategory fetched successfully',
      data: { subCategory },
    };
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!subCategory) {
      throw new NotFoundException('Subcategory not found');
    }

    if (updateSubCategoryDto.categoryId) {
      const categoryExists = await this.categoryModel.findById(updateSubCategoryDto.categoryId);
      if (!categoryExists) {
        throw new NotFoundException('New category not found');
      }
    }

    const updated = await this.subCategoryModel.findByIdAndUpdate(
      id,
      { $set: updateSubCategoryDto },
      { new: true },
    );

    return {
      status: 'success',
      message: 'Subcategory updated successfully',
      data: { subCategory: updated },
    };
  }

  async remove(id: string) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!subCategory) {
      throw new NotFoundException('Subcategory not found');
    }

    await this.subCategoryModel.deleteOne({ _id: id });

    return {
      status: 'success',
      message: 'Subcategory deleted successfully',
    };
  }
}
