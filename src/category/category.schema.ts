
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type categoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({
        required: true, type: String,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [30, 'Name must be at most 30 characcters']
    })
    name: string;

    @Prop({
        type: String,
    })
    image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
