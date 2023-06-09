import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Кулинарный цех')
    .setDescription('Веб-сервер для работы с клиентами, заказами и товарами кулинарного цеха, изготавливающего кондитерские изделия.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3004); //localhost
  app.setGlobalPrefix('/api');
}
bootstrap();
