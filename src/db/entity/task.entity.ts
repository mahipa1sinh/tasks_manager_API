import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskCategoryEntity } from './task_category.entity';

@Entity('task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({
    nullable: false,
  })
  task_title: string;

  @Column({
    default: 'To Do',
    nullable: false,
  })
  task_status: string;

  @Column({
    nullable: true,
  })
  task_description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  task_created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  task_scheduled_at: Date;

  @Column({
    default: false,
    nullable: false,
  })
  is_task_archived: boolean;

  @ManyToMany(
    () => TaskCategoryEntity,
    (task_categories) => task_categories.task_category_parent,
  )
  task_categories: TaskCategoryEntity[];
}
