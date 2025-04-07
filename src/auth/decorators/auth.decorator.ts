import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { ValidRoles } from '../interfaces';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (...args: ValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...args),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
};
