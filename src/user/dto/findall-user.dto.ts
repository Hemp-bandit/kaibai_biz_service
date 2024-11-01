import { ApiProperty, PartialType, PickType } from "@nestjs/swagger"
import { User } from "../entities/user.entity"

export class FindAllUser extends PickType(User, ["name", "id", "phone"]) {
  @ApiProperty({ default: 0 }) offset: number
  @ApiProperty({ default: 10 }) take: number
}

export class FindOneUser extends PartialType(PickType(User, ["name", "id", "phone"])) {

}