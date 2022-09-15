import { TaskEntity } from '../tasks/task.entity';
import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
} from 'typeorm';
import { UserRoles } from './userRole.enum';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: string;
}
