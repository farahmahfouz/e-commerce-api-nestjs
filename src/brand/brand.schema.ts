
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type brandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand {
    @Prop({
        required: true, type: String,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [100, 'Name must be at most 100 characcters']
    })
    name: string;

    @Prop({
        type: String,
    })
    image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
