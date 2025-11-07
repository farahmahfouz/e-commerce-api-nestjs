
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/category/category.schema';

export type subCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
    @Prop({
        required: true, type: String,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [30, 'Name must be at most 30 characcters']
    })
    name: string;

    @Prop({
        type: Types.ObjectId,
        ref: Category.name,
        required: true,
    })
    categoryId: Category;

}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
