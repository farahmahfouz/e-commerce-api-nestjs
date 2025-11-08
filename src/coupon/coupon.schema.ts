
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type couponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true })
export class Coupon {
    @Prop({
        required: true, type: String,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [100, 'Name must be at most 100 characcters']
    })
    name: string;

    @Prop({
        required: true, type: Date,
    })
    expiryDate: Date;

    @Prop({
        required: true, type: Number,
    })
    discount: number;
}

export const couponSchema = SchemaFactory.createForClass(Coupon);
