import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('orders')
  handleOrder(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ) {
    const message = context.getMessage();
    console.log(message, payload);
    const key = message.key?.toString();

    console.log('Partition:', context.getPartition());
    console.log('Key:', key);
    console.log('Value:', payload);

    this.orderService.processOrder(payload);
  }
}
