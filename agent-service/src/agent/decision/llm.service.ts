import { Injectable } from '@nestjs/common';
import { Decision } from '../types/decision.types';
import { Order } from '../types/order.types';
import { extractDecision } from '../utils/parser';

@Injectable()
export class LLMService {
  async getDecision(order: Order): Promise<Decision> {
    const prompt = `You are a strict decision engine.

      Rules:
      1. If user is invalid → REJECT
      2. If price > 50000 → REVIEW 
      3. Else → APPROVE

      Input:
      price: ${order.price}
      user: ${order.userId}

      Return ONLY JSON:
      { "decision": "APPROVE | REJECT | REVIEW" }`;

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();

    console.log({
      event: 'LLM_RESPONSE',
      orderId: order.id,
      raw: data.response,
    });

    return extractDecision(data.response);
  }
}
