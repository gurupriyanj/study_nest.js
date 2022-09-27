import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(process.env.PORT || port);
  logger.log(`server listening on port${process.env.PORT}`);
}
bootstrap();

// app.useGlobalInterceptors(new TransformInterceptor());
