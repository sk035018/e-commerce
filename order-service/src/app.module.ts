import { Module } from '@nestjs/common';
import { OrderController } from './order/order-consumer.controller';
import { OrderService } from './order/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
