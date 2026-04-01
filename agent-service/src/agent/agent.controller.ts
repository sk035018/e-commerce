import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Order } from './types/order.types';
import { AgentService } from './agent.service';

@Controller()
export class AgentController {
  constructor(
    private agentService: AgentService,
  ) {}

  @MessagePattern('order_created')
  async handleOrder(@Payload() order: Order) {
    const result = await this.agentService.handleOrder(order);

    console.log('🧠 Final Decision:', result.finalDecision);

    return result;
  }
}
