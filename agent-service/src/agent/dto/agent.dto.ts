import { IsNumber, IsString } from 'class-validator';

export class AgentDto {
  @IsString()
  userId!: string;

  @IsString()
  product!: string;

  @IsNumber()
  price!: number;
}
