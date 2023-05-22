import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,

    {
      transport: Transport.KAFKA,
      options: {
        client: {
          connectionTimeout: 10000,
          brokers: [process.env.KAFKA_BROKERS] as any,
          sasl: {
            mechanism: process.env.KAFKA_SASL_MECHANISM as any,
            username: process.env.KAFKA_USERNAME as string,
            password: process.env.KAFKA_PASSWORD as string,
          },
          ssl: true,
        },
        subscribe: {
          fromBeginning: true,
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
