import { SetMetadata } from '@nestjs/common';
import { config } from 'dotenv';
config();

export const Roles = (...roles: string[]) =>
  SetMetadata(process.env.METADATA_KEY, roles);
