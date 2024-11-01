import { ApiProperty } from "@nestjs/swagger";
import { $Enums, product } from "@prisma/client";

export class Product implements product {
  @ApiProperty() name: string;
  @ApiProperty() id: number;
  @ApiProperty() create_time: Date;
  @ApiProperty() update_time: Date;
  @ApiProperty() picture: string;
  @ApiProperty() price: number;
  @ApiProperty() store_count: number;
  @ApiProperty() status: $Enums.product_status;
}

