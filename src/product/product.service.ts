import { PrismaService } from '@src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ERROR_CODE from '@src/error';
import BizError from '@src/error/biz_error';
import { ProductModule } from './product.module';
import { get_time } from '@src/common/utile';
import { FindAllProduct } from './dto/findall-product.dto';
import { T_List_rsp } from '@src/types';

@Injectable()
export class ProductService {
  @Inject() prisma: PrismaService;
  async create(createProductDto: CreateProductDto): Promise<ProductModule> {
    const db_product = await this.prisma.product.findFirst({ where: { name: createProductDto.name } });
    if (db_product) throw new BizError(ERROR_CODE.PRODUCT_EXISTS, "产品已经存在");
    const res = await this.prisma.$transaction([
      this.prisma.product.create({ data: { ...createProductDto, create_time: get_time() } })
    ]);
    return res
  }

  async findAll(data: FindAllProduct): Promise<T_List_rsp<ProductModule>> {
    const take = data.take;
    const skip = data.offset;
    Reflect.deleteProperty(data, 'take')
    Reflect.deleteProperty(data, 'offset')
    const [list, total] = await Promise.all([
      this.prisma.product.findMany({
        where: data,
        take,
        skip
      }),
      this.prisma.product.count()
    ])
    return { list, total }
  }

  async findOne(id: number): Promise<ProductModule> {
    if (!id) throw new BizError(ERROR_CODE.PRODUCT_ID_IS_NULL, "产品id为空");
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductModule> {
    await this.findOne(id);
    const update_res = await this.prisma.$transaction([
      this.prisma.product.update({ where: { id }, data: updateProductDto })
    ]);

    return update_res;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.$transaction([
      this.prisma.product.delete({ where: { id } })
    ])
  }
}
