import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { AgentService } from './agent.service';
import { KafkaProducerService } from '../kafka/kafka-producer.service';

@Controller()
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  @EventPattern('order_created')
  async handleOrder(@Payload() payload: any, @Ctx() context: KafkaContext) {
    const order = payload;
    const decision = await this.agentService.evaluateOrder(order);

    console.log(`🧠 Decision: ${decision}`);

    let event;

    switch (decision) {
      case 'APPROVE':
        event = 'payment_initiate';
        break;

      case 'REJECT':
        event = 'order_rejected';
        break;

      case 'REVIEW':
        event = 'order_review';
        break;

      default:
        event = 'failed_to_decide';
        break;
    }

    this.kafkaProducer.emit(event, {
      key: order.userId,
      value: order,
    });
  }
}
