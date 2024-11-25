import { EntitySchema } from 'typeorm';

import { Role } from './roles.entity';
import { User } from './user.entity';
import { UserRole } from './userroles.entity';

export interface UserInterface {
  Id: number;
  Active: boolean;
  LastUpdatedAt: Date;
  CreatedAt: Date;
  Deleted: boolean;
  Type: number;
  FirstName: string;
  Password: string;
  LastName: string;
  Phone?: string | null;
  Gmail?: string | null;
  AppleId?: string | null;
  Facebook?: string | null;
  Amazon?: string | null;
  UserName?: string | null;
  NormalizedUserName?: string | null;
  Email?: string | null;
  NormalizedEmail?: string | null;
  EmailConfirmed: boolean;
  PasswordHash?: string | null;
  SecurityStamp?: string | null;
  ConcurrencyStamp?: string | null;
  PhoneNumber?: string | null;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd?: Date | null;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
}

export const UserSchema = new EntitySchema<UserInterface>({
  name: 'User',
  target: User,
  columns: {
    Id: {
      type: 'number',
      primary: true,
      generated: true,
    },
    Active: {
      type: 'boolean',
    },
    LastUpdatedAt: {
      type: Date,
      createDate: true,
    },
    CreatedAt: {
      type: 'datetime',
    },
    Deleted: {
      type: 'boolean',
    },
    Type: {
      type: 'number',
    },
    FirstName: {
      type: 'string',
    },
    LastName: {
      type: 'string',
    },
    Phone: {
      type: 'string',
      nullable: true,
    },
    Gmail: {
      type: 'string',
      nullable: true,
    },
    AppleId: {
      type: 'string',
      nullable: true,
    },
    Facebook: {
      type: 'string',
      nullable: true,
    },
    Amazon: {
      type: 'string',
      nullable: true,
    },
    UserName: {
      type: 'string',
      nullable: true,
    },
    NormalizedUserName: {
      type: 'string',
      nullable: true,
    },
    Email: {
      type: 'string',
      nullable: true,
    },
    NormalizedEmail: {
      type: 'string',
      nullable: true,
    },
    EmailConfirmed: {
      type: 'boolean',
    },
    PasswordHash: {
      type: 'string',
      nullable: true,
    },
    SecurityStamp: {
      type: 'string',
      nullable: true,
    },
    ConcurrencyStamp: {
      type: 'string',
      nullable: true,
    },
    PhoneNumber: {
      type: 'string',
      nullable: true,
    },
    PhoneNumberConfirmed: {
      type: 'boolean',
    },
    TwoFactorEnabled: {
      type: 'boolean',
    },
    LockoutEnd: {
      type: 'datetime',
      nullable: true,
    },
    LockoutEnabled: {
      type: 'boolean',
    },
    AccessFailedCount: {
      type: 'number',
    },
  },
});

interface RoleInterface {
  Id: number;
  Name: string;
  NormalizedName: string;
  ConcurrencyStamp: string;
}

export const RoleSchema = new EntitySchema<RoleInterface>({
  name: 'Role',
  target: Role,
  columns: {
    Id: {
      type: Number,
      primary: true,
      generated: true,
    },
    Name: {
      type: String,
      nullable: true,
      length: 256,
    },
    NormalizedName: {
      type: String,
      nullable: true,
      length: 256,
    },
    ConcurrencyStamp: {
      type: String,
      nullable: true,
    },
  },
});

interface UserRoleInterface {
  Id: number;
  User: number;
  Role: number;
}

export const UserRoleSchema = new EntitySchema<UserRoleInterface>({
  name: 'UserRole',
  target: UserRole,
  columns: {
    Id: {
      type: Number,
      primary: true,
      generated: true,
    },
    User: {
      type: Number,
      primary: true,
    },
    Role: {
      type: Number,
      primary: true,
    },
  },
  relations: {
    User: {
      type: 'many-to-one',
      target: 'User',
      onDelete: 'CASCADE',
      inverseSide: 'UserRoles',
    },
    Role: {
      type: 'many-to-one',
      target: 'Role',
      onDelete: 'CASCADE',
      inverseSide: 'UserRoles',
    },
  },
});
