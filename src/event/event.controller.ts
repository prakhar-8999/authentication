import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { EventRegistration } from './event.entity';
import { AuthenticationGuard } from 'src/constants/decorators/AuthDecorator';
import { roles } from 'src/constants/roles';

@Controller('api')
export class EventController {
  constructor(private readonly eventRegistrationService: EventService) {}

  @AuthenticationGuard([roles.MANAGER])
  @Post('event-registration')
  async register(@Body() registerEventDto: EventRegistration): Promise<EventRegistration> {
    return this.eventRegistrationService.registerUser(registerEventDto);
  }

  @AuthenticationGuard([roles.ADMIN])
  @Get('event-registrations')
  async getAllEvents(): Promise<EventRegistration[]> {
    return this.eventRegistrationService.getAllEvents();
  }
}
