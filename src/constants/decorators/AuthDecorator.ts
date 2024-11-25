import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

export const ROLES_KEY = 'roles';

export const AuthenticationGuard = (roles: string[] | number[] = []) => {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: PropertyDescriptor
  ) => {
    SetMetadata(ROLES_KEY, roles)(target, key, descriptor);
    UseGuards(AuthGuard)(target, key, descriptor);
  };
};
