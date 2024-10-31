import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule],
})
export class AppModule { }
