import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import BizError from '@src/error/biz_error';
import ERROR_CODE from '@src/error';
import { get_time } from '@src/commom/utile';

@Injectable()
export class UserService {
  @Inject() private prisma: PrismaService

  async create(createUserDto: CreateUserDto) {
    const db_user = await this.prisma.user.findFirst({
      where: { OR: [{ phone: createUserDto.phone }, { name: createUserDto.name }] }
    });

    if (db_user) {
      throw new BizError(ERROR_CODE.USER_EXISTS, "该商家已经存在!");
    }

    await this.prisma.$transaction([
      this.prisma.user.create({
        data: { ...createUserDto, create_time: get_time() }
      })
    ])

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
