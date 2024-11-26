import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRegistration)
    private readonly eventRegistrationRepository: Repository<EventRegistration>,
  ) {}

  async registerUser(dto: any): Promise<any> {
    const eventRegistration = this.eventRegistrationRepository.create(dto);
    return this.eventRegistrationRepository.save(eventRegistration);
  }

  async getAllEvents(): Promise<EventRegistration[]> {
    const events = await this.eventRegistrationRepository.find();
    return events
  }
}
