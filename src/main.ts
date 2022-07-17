import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.listen(PORT, () => {
    console.log('Started on port', PORT);
  });
};
start();
