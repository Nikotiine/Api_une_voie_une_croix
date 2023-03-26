import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enum/UserRole.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
