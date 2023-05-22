import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import * as kafka from 'kafkajs';

async function bootstrap() {
  console.log(process.env.KAFKA_BROKERS);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,

    {
      transport: Transport.KAFKA,
      options: {
        client: {
          connectionTimeout: 5000,
          brokers: [process.env.KAFKA_BROKERS] as any,
          sasl: {
            mechanism: process.env.KAFKA_SASL_MECHANISM as any,
            username: process.env.KAFKA_USERNAME as string,
            password: process.env.KAFKA_PASSWORD as string,
          },
          ssl: true,
        },
        consumer: {
          groupId: 'notification_ms',
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
