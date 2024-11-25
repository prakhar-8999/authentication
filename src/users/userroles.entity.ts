import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Role } from './roles.entity';
import { User } from './user.entity';

@Entity('userroles')
@Unique(['UserId'])
export class UserRole {
  @PrimaryColumn()
  UserId: number;

  @PrimaryColumn()
  RoleId: number;

  @ManyToOne(() => Role, (role) => role.Id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'RoleId' })
  role: Role;

  @ManyToOne(() => User, (user) => user.Id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'UserId' })
  user: User;
  // @PrimaryColumn()
  // @ManyToOne(() => User, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'UserId' })
  // UserId: User; // Represents the foreign key column in the database

  // @PrimaryColumn()
  // @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'RoleId' })
  // RoleId: Role; // Represents the foreign key column in the database

  // // @PrimaryGeneratedColumn()
  // // Id: number;
  // // @PrimaryGeneratedColumn()
  // @PrimaryColumn()
  // @ManyToOne(() => User, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'UserId' }) // Explicitly define the column name
  // UserId: User;

  // @PrimaryColumn()
  // @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'RoleId' }) // Explicitly define the column name
  // RoleId: Role;
}
