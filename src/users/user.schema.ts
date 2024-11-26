import { EntitySchema } from 'typeorm';
import { Role } from './roles.entity';
import { User } from './user.entity';
import { UserRole } from './userroles.entity';

export interface UserInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:"ADMIN" | "USER"
}

export const UserSchema = new EntitySchema<UserInterface>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: 'number',
      primary: true,
      generated: true,
    },
    createdAt: {
      type: 'datetime',
    },
    updatedAt:{
      type: 'datetime',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      nullable: true,
    },
    password: {
      type: 'string',
      nullable: true,
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
