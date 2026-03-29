import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentConsumerController } from './payment/payment-consumer.controller';
import { PaymentService } from './payment/payment.service';
import { Payment } from './payment/payment.entity';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
      entities: [Payment],
      synchronize: true,
      extra: { max: 10 },
    }),
    TypeOrmModule.forFeature([Payment]),
    KafkaModule,
  ],
  controllers: [PaymentConsumerController],
  providers: [PaymentService],
})
export class AppModule {}
