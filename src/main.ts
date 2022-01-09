import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

// Global middleware
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger)
  await app.listen(3000);
}
bootstrap();
