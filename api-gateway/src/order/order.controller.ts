import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.kafkaService.emit('orders', {
      key: body.userId,
      value: body,
    });
  }
}
