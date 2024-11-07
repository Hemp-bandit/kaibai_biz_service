import { ApiProperty } from "@nestjs/swagger"

export class FindAllProduct {
  @ApiProperty({ default: 0 }) offset: number
  @ApiProperty({ default: 10 }) take: number
}
