import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces';

export const META_ROLE = 'roles';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(META_ROLE, args);
