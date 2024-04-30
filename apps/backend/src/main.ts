import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import {
  swaggerDocumentOptions,
  swaggerSetupOptions,
} from '../swagger/swagger';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());

  // Cors
  if (process.env.CORS_ENABLE === '1') {
    app.enableCors();
  }

  setupOpenApi(app);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

function setupOpenApi(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  fs.writeFileSync(
    './libs/web/api-client/src/lib/swagger.json',
    JSON.stringify(document)
  );
  SwaggerModule.setup('api', app, document, swaggerSetupOptions);
}
