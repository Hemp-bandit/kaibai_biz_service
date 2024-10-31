import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule { }
