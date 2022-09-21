import { TaskEntity } from '../tasks/task.entity';
import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
  BeforeInsert,
  AfterInsert,
} from 'typeorm';
import { UserRoles } from './userRole.enum';
import * as bcrypt from 'bcrypt';

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

  @OneToMany(() => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
