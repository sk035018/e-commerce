import { IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  userId!: string;

  @IsString()
  product!: string;
}
