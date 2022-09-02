import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_category')
export class TaskCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  task_category_id: number;

  @Column({
    nullable: false,
  })
  task_category_title: string;

  @Column({
    nullable: true,
  })
  task_category_description: string;

  @ManyToMany(
    () => TaskEntity,
    (task_category_parent) => task_category_parent.task_categories,
  )
  @JoinTable()
  task_category_parent: TaskEntity[];
}
