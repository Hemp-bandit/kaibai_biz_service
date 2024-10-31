import { ApiProperty } from "@nestjs/swagger";
import { user } from "@prisma/client";

export class User implements user {
  @ApiProperty() name: string;
  @ApiProperty() id: number;
  @ApiProperty() create_time: Date;
  @ApiProperty() update_time: Date;
  @ApiProperty() password: string;
  @ApiProperty() phone: string;
  @ApiProperty() picture: string;
  @ApiProperty() introduce: string;
}
