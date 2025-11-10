import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const jwtService = app.get(JwtService);
  // const token = jwtService.sign(
  //   { _id: '69093e6ce189e6a09c43ccff', email: 'bedair@gmail.com', role: 'user', password: 'test12345' },
  //   { secret: process.env.JWT_SECRET }
  // );
  // console.log('Temporary admin token:', token);
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
