import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { INestApplication, Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ErrorCodeExceptionFilter from './commom/errorCode-exception.filter';
import { HttpExceptionFilter } from './commom/http-exception.filter';
import { PrismaExceptionFilter } from './commom/prisma-exception.filter';
import { RequestGuard } from './commom/request.guard';
import { ResponseTransformInterceptor } from './commom/response-transform.interceptor';

dotenv.config();

function configOpenApi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(`TestPortal接口文档`)
    .setVersion('0.0.1')
    .setContact('wyswill', '', 'yansong.wang3@gientech.con')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const MODE = process.env.MODE;
  Logger.log(MODE, 'mode');
  SwaggerModule.setup('/doc', app, document, { jsonDocumentUrl: '/doc.json' });
}


const validationOptions: ValidationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));

  app.useGlobalFilters(new PrismaExceptionFilter(), new ErrorCodeExceptionFilter(), new HttpExceptionFilter()); // 注册全局错误过滤器
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalGuards(new RequestGuard());

  configOpenApi(app);
  const defaultPort = 3000;
  await app.listen(process.env.PORT ?? defaultPort, () => {
    Logger.log(`服务启动在:http://localhost:${process.env.port ?? defaultPort},  文档地址:http://localhost:${process.env.port ?? defaultPort}/doc`, 'swagger')
  });
}

bootstrap();
