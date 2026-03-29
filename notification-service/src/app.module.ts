import { Module } from '@nestjs/common';
import { NotificationConsumerController } from './notification/notification-consumer.controller';
import { NotificationService } from './notification/notification.service';

@Module({
  controllers: [NotificationConsumerController],
  providers: [NotificationService],
})
export class AppModule {}
