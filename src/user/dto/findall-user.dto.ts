import { ApiProperty, PartialType, PickType } from "@nestjs/swagger"
import { User } from "../entities/user.entity"

export class FindAllUser extends PickType(User, ["name", "id", "phone"]) {
  @ApiProperty() offset: number
  @ApiProperty() take: number
}

export class FindOneUser extends PartialType(PickType(User, ["name", "id", "phone"])) {

}