import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

@Injectable()
/**
 * PrismaService
 */
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    Logger.log(process.env.DATABASE_URL, 'DATABASE_URL');
    const url = process.env.DATABASE_URL;
    // 传递数据库url
    super({
      datasources: { db: { url } },
      log: ['warn', 'error'],
    });
  }

  // 模块卸载时关闭连接
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // 模块初始化时创建链接
  async onModuleInit() {
    await this.$connect();
  }
}
