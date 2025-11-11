import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { APIFeatures } from 'src/utils/api-features';
import { Category } from 'src/category/category.schema';
import { SubCategory } from 'src/sub-category/sub-category.schema';
import { Brand } from 'src/brand/brand.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>) { }

  async create(createProductDto: CreateProductDto) {
    const { title, category, subCategory, brand, sold, quantity } = createProductDto;

    // 1️⃣ check duplicate title
    const productExists = await this.productModel.findOne({ title });
    if (productExists) throw new HttpException('This product already exist', 400);

    // 2️⃣ check category existence
    const categoryExists = await this.categoryModel.findById(category);
    if (!categoryExists) throw new HttpException('Category not found', 404);

    // 3️⃣ check subCategory existence (if provided)
    if (subCategory) {
      const subCatExists = await this.subCategoryModel.findById(subCategory);
      if (!subCatExists) throw new HttpException('Subcategory not found', 404);
    }

    // 4️⃣ check brand existence (if provided)
    if (brand) {
      const brandExists = await this.brandModel.findById(brand);
      if (!brandExists)
        throw new HttpException('Brand not found', 404);
    }

    if (sold > quantity) {
      throw new HttpException('Sold quantity cannot exceed available quantity', 400);
    }

    const newProduct = await this.productModel.create(createProductDto);
    return {
      status: 'success',
      message: 'Product created successfully',
      data: { product: newProduct }
    }
  }

  async findAll(query: any) {
    const features = new APIFeatures(this.productModel.find(), query).filter().sort().limitFields().pagination().search();
    const products = await features.getQuery();
    if (!products) throw new NotFoundException("Products not found");

    return {
      status: 'success',
      message: 'Products retrieved successfully',
      count: products.length,
      data: products
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found')
    return {
      status: 'success',
      message: 'Product retrieved successfully',
      data: product
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const newSold = updateProductDto.sold ?? product.sold;
    const newQuantity = updateProductDto.quantity ?? product.quantity;

    if (newSold > newQuantity) {
      throw new HttpException('Sold quantity cannot exceed available quantity', 400);
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

    return {
      status: 'success',
      message: 'Product updated successfully',
      data: { product: updatedProduct },
    };
  }

  async remove(id: string) {
    const updatedProduct = await this.productModel.findByIdAndDelete(id)
    if (!updatedProduct) throw new NotFoundException('Product Not Found');
    return {
      status: 'success',
      message: 'Product deleted successfully',
    }
  }
}
