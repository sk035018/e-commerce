import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'agent-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'agent-consumer-group',
      },
    },
  });

  await app.listen();
}
bootstrap();
