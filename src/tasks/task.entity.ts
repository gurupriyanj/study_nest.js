import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: taskStatus;
}
export enum taskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
