import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    console.log(`Updating event with ID: ${id}`);
    console.log('Update DTO:', updateEventDto);

    const existingEvent = await this.eventRepository.findOne({ where: { id } });
    console.log('Existing Event:', existingEvent);

    if (!existingEvent) {
      console.error(`Event with ID ${id} not found`);
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const updatedEvent = {
      ...existingEvent,
      ...updateEventDto,
    };

    console.log('Updated Event:', updatedEvent);

    const hasChanges = Object.keys(updateEventDto).some(
      (key) => updateEventDto[key] !== existingEvent[key],
    );

    if (!hasChanges) {
      console.log('No changes detected. Skipping update.');
      return existingEvent;
    }

    const savedEvent = await this.eventRepository.save(updatedEvent);
    console.log('Event saved:', savedEvent);

    const refetchedEvent = await this.eventRepository.findOne({
      where: { id },
    });
    console.log('Refetched Event:', refetchedEvent);

    if (JSON.stringify(savedEvent) !== JSON.stringify(refetchedEvent)) {
      console.error(
        'Saved event does not match refetched event. Update may have failed.',
      );
    }

    return savedEvent;
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
