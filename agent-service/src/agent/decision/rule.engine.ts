import { Injectable } from '@nestjs/common';
import { Decision } from '../types/decision.types';
import { Order } from '../types/order.types';

@Injectable()
export class RuleEngine {
  getDecision(order: Order): Decision {
    const isValidUser =
      order.userId.startsWith('user') || this.isUUID(order.userId);

    if (!isValidUser) return 'REJECT';

    if (order.price > 50000) return 'REVIEW';

    return 'APPROVE';
  }

  private isUUID(value: string): boolean {
    return /^[0-9a-fA-F-]{36}$/.test(value);
  }
}
