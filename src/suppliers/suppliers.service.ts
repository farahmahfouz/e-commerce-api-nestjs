import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Suppliers } from './suppliers.schema';
import { Model } from 'mongoose';

@Injectable()
export class SuppliersService {
   constructor(@InjectModel(Suppliers.name) private supplierModel: Model<Suppliers>) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const { name } = createSupplierDto;

    const existingSupplier = await this.supplierModel.findOne({ name });
    if (existingSupplier) {
      throw new HttpException('Supplier already exists', 400);
    }

    const newSupplier = await this.supplierModel.create(createSupplierDto);
    return {
      status: 'success',
      message: 'Supplier created successfully',
      data: { supplier: newSupplier },
    };
  }

  async findAll() {
    const suppliers = await this.supplierModel.find();
    return {
      status: 'success',
      message: 'Suppliers fetched successfully',
      count: suppliers.length,
      data: { suppliers },
    };
  }

  async findOne(id: string) {
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return {
      status: 'success',
      message: 'Supplier fetched successfully',
      data: { supplier },
    };
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierModel.findByIdAndUpdate(id, updateSupplierDto, { new: true });
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return {
      status: 'success',
      message: 'Supplier updated successfully',
      data: { supplier },
    };
  }

  async remove(id: string) {
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    await this.supplierModel.deleteOne({ _id: id });
    return {
      status: 'success',
      message: 'Supplier deleted successfully',
    };
  }
}
