import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  processOrder(order: any) {
    console.log('Processing order:', order);
  }
}
