import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 256, nullable: true })
  Name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  NormalizedName: string;
}
