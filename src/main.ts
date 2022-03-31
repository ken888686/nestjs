import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('NestJS API')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true,
  };
  SwaggerModule.setup('swagger', app, document, options);
}

bootstrap();
