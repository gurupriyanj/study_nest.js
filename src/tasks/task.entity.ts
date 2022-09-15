import { User } from '../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class TaskEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: taskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}

export enum taskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
