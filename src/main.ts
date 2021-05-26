import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const configRabbit = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_ADDRESS],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
    },
  };
  const app = await NestFactory.createMicroservice(AppModule, configRabbit);
  await app.listenAsync();
}
bootstrap();
