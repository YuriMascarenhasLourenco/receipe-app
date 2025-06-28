import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserORMEntity } from './user.orm-entity';

@Entity()
export class RecipeORMEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  ingredients: string;

  @Column('text')
  instructions: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => UserORMEntity, (item) => item.recipes)
  @JoinColumn()
  user: UserORMEntity;
}
