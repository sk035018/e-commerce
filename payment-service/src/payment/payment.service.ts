import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { KafkaProducerService } from '../kafka/kafka-producer.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async processPayment(order: any) {
    console.log('💰 Processing payment for:', order);
    const { userId, product } = order;

    // simulate payment logic
    const status = Math.random() > 0.2 ? 'SUCCESS' : 'FAILED';

    const paymentRes = this.paymentRepo.create({ userId, product, status });
    await this.paymentRepo.save(paymentRes);

    console.log(`💳 Payment ${status} for user ${order.userId}`);
    this.kafkaProducer.emit('payment_processed', {
      key: order.userId,
      value: paymentRes,
    });

    return paymentRes;
  }
}
