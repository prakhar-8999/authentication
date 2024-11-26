import { EntitySchema } from 'typeorm';
import { EventRegistration } from './event.entity';

export interface EventRegistrationInterface {
    id: string; 
    userId: number;
    registrationDate: Date; 
    isPaid: boolean; 
    paymentDetails?: Record<string, any>; 
    status: 'pending' | 'confirmed' | 'cancelled'; 
    additionalInfo?: Record<string, any>[];
    createdAt: Date;
    updatedAt: Date;
  }

export const EventRegistrationSchema = new EntitySchema<EventRegistrationInterface>({
  name: 'EventRegistration',
  tableName: 'event_registrations',
  target: EventRegistration,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    userId: {
      type: 'uuid',
      nullable: false,
    },
    registrationDate: {
      type: 'datetime',
    },
    isPaid: {
      type: 'boolean',
      default: false,
    },
    paymentDetails: {
      type: 'json',
      nullable: true,
    },
    status: {
      type: 'varchar',
      length: 20,
      default: 'pending',
    },
    additionalInfo: {
      type: 'json',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    userId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
});
