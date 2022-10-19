import { User } from '../auth/user.entity';
import { TaskEntity } from '../tasks/task.entity';

export const appConfig = () => ({
  port: Number(process.env.PORT),
  jwt_secret: process.env.JWT_SECRET,
  metadata_key: process.env.METADATA_KEY,
  database: {
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [User, TaskEntity],
  },
});
