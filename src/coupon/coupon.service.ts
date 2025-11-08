import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from './coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) { }

  async create(createCouponDto: CreateCouponDto) {
    const newCoupon = await this.couponModel.create(createCouponDto);
    return {
      status: 'success',
      message: 'Coupon created successfully',
      data: { coupon: newCoupon },
    };
  }

  async findAll() {
    const coupons = await this.couponModel.find();
    return {
      status: 'success',
      message: 'Coupons retrieved successfully',
      results: coupons.length,
      data: coupons,
    };
  }

  async findOne(id: string) {
    const coupon = await this.couponModel.findById(id);
    if (!coupon) throw new NotFoundException('Coupon not found');
    return {
      status: 'success',
      message: 'Coupon retrieved successfully',
      data: coupon,
    };
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const updatedCoupon = await this.couponModel.findByIdAndUpdate(
      id,
      updateCouponDto,
      { new: true },
    );
    if (!updatedCoupon) throw new NotFoundException('Coupon not found');
    return {
      status: 'success',
      message: 'Coupon updated successfully',
      data: { coupon: updatedCoupon },
    };
  }

  async remove(id: string) {
    const deleted = await this.couponModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Coupon not found');
    return {
      status: 'success',
      message: 'Coupon deleted successfully',
    };
  }
}
