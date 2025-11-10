import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { RequestProductService } from './request-product.service';
import { CreateRequestProductDto } from './dto/create-request-product.dto';
import { UpdateRequestProductDto } from './dto/update-request-product.dto';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { Roles } from 'src/user/decorator/roles.decorator';

@Controller('api/v1/req-product')
export class RequestProductController {
  constructor(private readonly requestProductService: RequestProductService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['user'])
  create(@Body() createRequestProductDto: CreateRequestProductDto, @Req() req) {
    if (req?.user?.role.toLowerCase() === 'admin') throw new UnauthorizedException('Admins are not allowed to request products');
    return this.requestProductService.create(createRequestProductDto, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findAll() {
    return this.requestProductService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.requestProductService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(['user'])
  update(@Param('id') id: string, @Body() updateRequestProductDto: UpdateRequestProductDto, @Req() req) {
    if (req?.user?.role.toLowerCase() === 'admin') throw new UnauthorizedException('Admins are not allowed to request products');
    return this.requestProductService.update(id, updateRequestProductDto, req.user._id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['user'])
  remove(@Param('id') id: string, @Req() req) {
    if (req?.user?.role.toLowerCase() === 'admin') throw new UnauthorizedException('Admins are not allowed to request products');
    return this.requestProductService.remove(id, req.user._id);
  }
}
