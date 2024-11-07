import { PartialType, IntersectionType, PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Product } from '../entities/product.entity';

export class UpdateProductDto extends IntersectionType(PartialType(CreateProductDto), PickType(Product, ['status'])) { }
