import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receipe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('text')
  description: string;

  @Column('simple-array')
  ingredients: string[];

  @Column('text')
  instructions: string;

  @Column()
  locale: string; // "en", "pt", etc.

  @CreateDateColumn()
  createdAt: Date;
}
