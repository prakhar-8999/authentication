import { User } from 'src/users/user.entity';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn 
  } from 'typeorm';
  
  @Entity('event_registrations')
  export class EventRegistration {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column()
    userId: string;
  
    @Column({ type: 'uuid', nullable: false })
    eventId: string;
  
    @CreateDateColumn()
    registrationDate: Date;
  
    @Column({ type: 'boolean', default: false })
    isPaid: boolean;
  
    @Column({ type: 'json', nullable: true })
    paymentDetails: Record<string, any>;
  
    @Column({ type: 'varchar', length: 20, default: 'pending' })
    status: 'pending' | 'confirmed' | 'cancelled';
  
    @Column({ type: 'json', nullable: true })
    additionalInfo: Record<string, any>[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  