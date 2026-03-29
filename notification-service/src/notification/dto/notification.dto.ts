import { IsBoolean, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  userId!: string;

  @IsString()
  product!: string;

  @IsBoolean()
  status!: boolean;
}
