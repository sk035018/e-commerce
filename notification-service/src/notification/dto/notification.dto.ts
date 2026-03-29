import { IsBoolean, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  userId!: string;

  @IsString()
  product!: string;

  @IsBoolean()
  status!: boolean;
}
