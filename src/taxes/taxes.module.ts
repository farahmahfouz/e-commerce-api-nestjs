import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Taxes, taxesSchema } from './taxes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Taxes.name, schema: taxesSchema }])],
  controllers: [TaxesController],
  providers: [TaxesService],
})
export class TaxesModule { }
