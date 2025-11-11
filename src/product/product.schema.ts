import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Brand } from "src/brand/brand.schema";
import { Category } from "src/category/category.schema";
import { SubCategory } from "src/sub-category/sub-category.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title must be at most 100 characters'],
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    minlength: [20, 'Description must be at least 20 characters'],
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
    max: [500, 'Quantity must be at most 500'],
  })
  quantity: number;

  @Prop({
    type: String,
    required: true,
  })
  imageCover: string;

  @Prop({
    type: [String],
    default: [],
  })
  images: string[];

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Sold count cannot be negative'],
  })
  sold: number;

  @Prop({
    type: Number,
    required: true,
    min: [0, 'Price must be positive'],
  })
  price: number;

  @Prop({
    type: Number,
    min: [0, 'Discount price must be positive'],
    validate: {
      validator: function (this: Product, value: number) {
        // discount can't exceed price
        return !value || value < this.price;
      },
      message: 'Discount price must be less than original price',
    },
  })
  priceAfterDiscount: number;

  @Prop({
    type: String,
    default: 'black',
  })
  color: string;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Prop({
    type: Types.ObjectId,
    ref: SubCategory.name,
  })
  subCategory: SubCategory;

  @Prop({
    type: Types.ObjectId,
    ref: Brand.name,
  })
  brand: Brand;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Rating average cannot be less than 0'],
    max: [5, 'Rating average cannot be more than 5'],
  })
  ratingsAvg: number;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Ratings quantity cannot be negative'],
  })
  ratingsQty: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
