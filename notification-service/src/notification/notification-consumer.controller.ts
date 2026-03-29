import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationConsumerController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('payment_processed')
  handlePaymentProcessed(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key?.toString();

    console.log('📥 Notification Service Received Event');
    console.log('Partition:', context.getPartition());
    console.log('Key:', key);
    console.log('Payload:', payload);

    this.notificationService.sendNotification(payload);
  }
}
