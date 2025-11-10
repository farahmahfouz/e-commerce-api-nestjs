import { Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Taxes } from './taxes.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaxesService {
  constructor(@InjectModel(Taxes.name) private taxesModel: Model<Taxes>) { }

  async createOrUpdate(createTaxDto: CreateTaxDto) {
    const tax = await this.taxesModel.findOne({});
    if (!tax) {
      const newTax = await this.taxesModel.create(createTaxDto);
      return {
        status: 'success',
        message: 'Tax created successfully',
        data: { tax: newTax }
      }
    }

    const updateTax = await this.taxesModel.findOneAndUpdate({}, createTaxDto, { new: true });
    return {
      status: 'success',
      message: 'Tax updated successfully',
      data: { tax: updateTax }
    }
  }

  async find() {
    const tax = await this.taxesModel.findOne({});
    return {
      status: 'success',
      message: 'Tax retrieved successfully',
      data: tax
    }
  }

  async reset() {
    await this.taxesModel.findOneAndUpdate({}, { taxPrice: 0, shippingPrice: 0 });

    return {
      status: 'success',
      message: 'Tax reset successfully'
    }
  }
}
