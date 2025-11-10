import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type taxesDodument = HydratedDocument<Taxes>


@Schema({ timestamps: true })
export class Taxes {
    @Prop({
        type: Number,
        default: 0
    })
    taxPrice: number;

    @Prop({
        type: Number,
        default: 0
    })
    shippingPrice: number;
}

export const taxesSchema = SchemaFactory.createForClass(Taxes);