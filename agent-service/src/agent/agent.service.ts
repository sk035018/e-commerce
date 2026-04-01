import { Injectable } from '@nestjs/common';
import { DecisionEngine } from './decision/decision.engine';
import { Order } from './types/order.types';

@Injectable()
export class AgentService {
  constructor(
    private readonly decisionEngine: DecisionEngine,
  ) {}

  async handleOrder(order: Order) {
    const result = await this.decisionEngine.process(order);

    console.log({
      event: 'ORDER_PROCESSED',
      orderId: order.id,
      userId: order.userId,
      price: order.price,
      ruleDecision: result.ruleDecision,
      llmDecision: result.llmDecision,
      finalDecision: result.finalDecision,
      timestamp: new Date().toISOString(),
    });

    if (
      result.llmDecision &&
      result.ruleDecision !== 'APPROVE' &&
      result.llmDecision !== result.ruleDecision
    ) {
      console.warn({
        event: 'LLM_OVERRIDE_BLOCKED',
        orderId: order.id,
        ruleDecision: result.ruleDecision,
        llmDecision: result.llmDecision,
      });
    }

    return result;
  }
}
