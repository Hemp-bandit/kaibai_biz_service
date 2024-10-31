import { PickType } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends PickType(Product, ['name', 'price', 'picture', 'store_count']) { }
