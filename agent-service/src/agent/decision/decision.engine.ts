import { Injectable } from '@nestjs/common';
import { RuleEngine } from './rule.engine';
import { LLMService } from './llm.service';
import { ValidatorService } from './validator.service';
import { DecisionResult } from '../types/decision.types';
import { Order } from '../types/order.types';

@Injectable()
export class DecisionEngine {
  constructor(
    private readonly ruleEngine: RuleEngine,
    private readonly llmService: LLMService,
    private readonly validator: ValidatorService,
  ) {}

  async process(order: Order): Promise<DecisionResult> {
    const start = Date.now();
    const ruleDecision = this.ruleEngine.getDecision(order);

    let llmDecision;

    if (ruleDecision === 'APPROVE') {
      llmDecision = await this.llmService.getDecision(order);
    }

    const finalDecision = this.validator.validate(
      order,
      ruleDecision,
      llmDecision,
    );

    console.log({
      event: 'PROCESSING_TIME',
      orderId: order.id,
      durationMs: Date.now() - start,
    });
    

    return {
      ruleDecision,
      llmDecision,
      finalDecision,
    };
  }
}
