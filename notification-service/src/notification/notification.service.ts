import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendNotification(data: any) {
    console.log('📨 Sending notification to user:', data.userId);

    if (data.status === 'SUCCESS') {
      console.log(`✅ Order confirmed for ${data.product}`);
    } else {
      console.log(`❌ Payment failed for ${data.product}`);
    }

    // simulate email/SMS
    console.log('📧 Notification sent!');
  }
}
