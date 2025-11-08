import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';

@Controller('api/v1/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
