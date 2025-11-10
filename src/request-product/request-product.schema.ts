import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type requestProductDocument = HydratedDocument<RequestProduct>;

@Schema({ timestamps: true })
export class RequestProduct {
    @Prop({ required: true, type: String })
    titleNeed: string;

    @Prop({ required: true, type: String, min: [10, "Details must be at least 10 characters"] })
    details: string;

    @Prop({ required: true, type: Number, min: [1, "Quantity must be at least 1 product"] })
    quantity: number;

    @Prop({ required: true, type: String })
    category: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    user: User;
}

export const requestProductSchema = SchemaFactory.createForClass(RequestProduct);