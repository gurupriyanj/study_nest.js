import * as mongoose from 'mongoose';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

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
