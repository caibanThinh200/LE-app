import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'upload'));
  app.setGlobalPrefix('/le/api/v1');
  app.enableCors();
  await app.listen(8888);
}
bootstrap();
