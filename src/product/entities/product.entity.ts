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
  @ApiProperty({ enum: $Enums.product_status, default: $Enums.product_status.DOWN }) status: $Enums.product_status;
}

