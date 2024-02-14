import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'upload'));
  app.setGlobalPrefix('/le/api/v1');
  app.enableCors({
    origin: [process.env.CLIENT_URL || 'https://le-app-navy.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });
  // app.use(cors());
  await app.listen(8888);
}
bootstrap();
