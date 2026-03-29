import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AgentService {
  async evaluateOrder(order: any): Promise<string> {
    console.log('Order Recieved', order);
    if (order.price < 1000) {
      console.log('Early return for cheaper price.');
      return 'APPROVE';
    }

    return this.callOllama(order);
  }

  private async callOllama(order: any): Promise<string> {
    try {
      console.log('Called agent', order);
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'tinyllama',
        prompt: `You are a decision engine.

              Allowed outputs: APPROVE, REJECT, REVIEW

              Output must be exactly one of these words.

              Order price: ${order.price}
              User: ${order.userId}`,
        stream: false,
      });
      console.log(response.data);
      return 'REVIEW';
      // return response.data.response.trim().toUpperCase();
    } catch {
      return 'REVIEW';
    }
  }
}
