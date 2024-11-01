import { PrismaService } from '@src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ERROR_CODE from '@src/error';
import BizError from '@src/error/biz_error';

@Injectable()
export class ProductService {
  @Inject() prisma: PrismaService;
  async create(createProductDto: CreateProductDto) {


    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    if (!id) throw new BizError(ERROR_CODE.PRODUCT_ID_IS_NULL, "产品id为空");
    


    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
