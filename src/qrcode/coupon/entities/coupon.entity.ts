import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  validUntil: Date;

  @Column()
  coupon: string; // Coupon are image stored, this prop contain the path to the coupon
}
