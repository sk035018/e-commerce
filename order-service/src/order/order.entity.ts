import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  product!: string;

  @Column({ name: 'price', nullable: false, type: 'bigint' })
  price!: number;
}
