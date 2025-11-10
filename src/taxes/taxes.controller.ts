import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { Roles } from 'src/user/decorator/roles.decorator';

@Controller('api/v1/taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.createOrUpdate(createTaxDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  find() {
    return this.taxesService.find();
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  reset() {
    return this.taxesService.reset();
  }
}
