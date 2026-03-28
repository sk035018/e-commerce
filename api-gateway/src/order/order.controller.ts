import { Body, Controller, Post } from '@nestjs/common';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly KafkaProducerService: KafkaProducerService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.KafkaProducerService.emit('orders', {
      key: body.userId,
      value: body,
    });
  }
}
