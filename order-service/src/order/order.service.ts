import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async processOrder(order: any) {
    console.log('📦 Processing order:', order);

    const saved = await this.orderRepo.save(order);

    console.log('💾 Saved Order:', saved);

    this.kafkaProducer.emit('order_created', {
      key: order.userId,
      value: order,
    });
  }
}
