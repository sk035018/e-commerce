import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentConsumerController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern('order_created')
  async handleOrderCreated(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key?.toString();

    console.log('📥 Payment Service Received Event');
    console.log('Partition:', context.getPartition());
    console.log('Key:', key);
    console.log('Payload:', payload);

    const result = await this.paymentService.processPayment(payload);

    console.log('✅ Payment Result:', result);
  }
}
