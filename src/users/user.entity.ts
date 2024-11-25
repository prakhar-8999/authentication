import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  Email: string;

  @Column()
  Password: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
