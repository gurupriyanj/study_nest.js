import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
