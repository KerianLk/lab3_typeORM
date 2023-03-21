import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Лабораторная работа №3')
    .setVersion('1.0')
    .build(); 
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); 
  await app.listen(3004); //localhost
  await app.setGlobalPrefix('/api'); 
}
bootstrap();



