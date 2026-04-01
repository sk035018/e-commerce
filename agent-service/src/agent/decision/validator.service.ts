import { Injectable } from '@nestjs/common';
import { Decision } from '../types/decision.types';
import { Order } from '../types/order.types';

@Injectable()
export class ValidatorService {
  validate(
    order: Order,
    ruleDecision: Decision,
    llmDecision?: Decision,
  ): Decision {
    const nonApprovedDecisions = ['REJECT', 'REVIEW'];

    if (nonApprovedDecisions.includes(ruleDecision)) {
      return ruleDecision;
    }

    if (!llmDecision) return ruleDecision;

    // LLM can only increase risk
    if(nonApprovedDecisions.includes(llmDecision)) {
      return llmDecision;
    }
    
    return 'APPROVE';
  }
}
