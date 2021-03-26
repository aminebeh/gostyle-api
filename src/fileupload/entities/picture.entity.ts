import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;
}
