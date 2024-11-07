import { ApiProperty } from "@nestjs/swagger"
import { UpdateProductDto } from "./update-product.dto"

export class FindAllProduct extends UpdateProductDto {
  @ApiProperty({ default: 0 }) offset: number
  @ApiProperty({ default: 10 }) take: number
}
