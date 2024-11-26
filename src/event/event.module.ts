import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([EventRegistration]),UsersModule],
    controllers: [EventController],
    providers: [EventService],
    exports:[EventService]
  })
export class EventModule {}
