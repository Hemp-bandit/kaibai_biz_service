import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import BizError from '@src/error/biz_error';
import ERROR_CODE from '@src/error';
import { get_time } from '@src/common/utile';
import { user, user_status } from '@prisma/client';
import { FindAllUser, FindOneUser } from './dto/findall-user.dto';
import { T_List_rsp } from '@src/types';

@Injectable()
export class UserService {
  @Inject() private prisma: PrismaService

  async create(createUserDto: CreateUserDto): Promise<user> {
    const db_user = await this.prisma.user.findFirst({
      where: { OR: [{ phone: createUserDto.phone }, { name: createUserDto.name }] }
    });

    if (db_user) {
      throw new BizError(ERROR_CODE.USER_EXISTS, "该商家已经存在!");
    }

    const [new_user] = await this.prisma.$transaction([
      this.prisma.user.create({
        data: { ...createUserDto, create_time: get_time() }
      })
    ])

    return new_user;
  }

  async findAll(info: FindAllUser): Promise<T_List_rsp<user>> {

    const [user_list, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          name: info.name,
          phone: info.phone,
          status: user_status.ENABLE,
        },
        take: info.take,
        skip: info.offset,
      }),
      this.prisma.user.count({
        where: {
          name: info.name,
          phone: info.phone,
          status: user_status.ENABLE
        }
      })
    ])

    return { list: user_list, total };
  }

  async findOne(info: FindOneUser): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: info.id,
        name: info.name,
        phone: info.phone,
        status: user_status.ENABLE
      }
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<user> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new BizError(ERROR_CODE.USER_NOT_EXISTS, "用户不存在")
    }
    const [update_user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: updateUserDto
      })
    ])
    return update_user;
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    if (!user) {
      throw new BizError(ERROR_CODE.USER_NOT_EXISTS, "用户不存在")
    }

    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id }, data: { status: user_status.DISABLE } })
    ])
  }
}
