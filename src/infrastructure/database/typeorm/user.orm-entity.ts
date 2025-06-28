import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeORMEntity } from './recipe.orm-entity';

@Entity()
export class UserORMEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
  @OneToMany(() => RecipeORMEntity, (recipe) => recipe.user)
  recipes: RecipeORMEntity[];
}
