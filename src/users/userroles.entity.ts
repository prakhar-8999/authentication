import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'UserId' })
  user: User;
}
