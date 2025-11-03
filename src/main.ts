import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get(JwtService);
  const token = jwtService.sign(
    { email: 'admin@test.com', role: 'admin', password: '1234567' },
    { secret: process.env.JWT_SECRET }
  );
  console.log('Temporary admin token:', token);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
