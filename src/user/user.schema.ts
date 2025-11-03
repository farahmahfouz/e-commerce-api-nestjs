
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({
        required: true, type: String,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [30, 'Name must be at most 30 characcters']
    })
    name: string;

    @Prop({
        required: true, type: String, unique: true,
    })
    email: string;

    @Prop({
        required: true, type: String,
        minlength: [6, 'Password must be at least 6 characters'],
    })
    password: string;

    @Prop({
        required: true, type: String,
        enum: ['admin', 'user'],
        default: 'user'
    })
    role: string;

    @Prop({
        type: String,
    })
    avatar: string;

    @Prop({
        type: Number,
    })
    age: number;

    @Prop({
        type: String,
    })
    phoneNumber: string;

    @Prop({
        type: String,
    })
    address: string;

    @Prop({
        type: Boolean,
        enum: [true, false],
    })
    isActive: boolean;

    @Prop({
        type: String,
    })
    verificationCode: string;

    @Prop({
        type: String,
        enum: ['male', 'female']
    })
    gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre<UserDocument>('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})