import { Module } from '@nestjs/common';
import { OrderController } from './order/order.controller';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OrderController],
})
export class AppModule {}
