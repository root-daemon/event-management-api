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

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  // Retrieve all events
  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  // Retrieve a single event by ID
  async findOne(id: number): Promise<Event> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  // Update an existing event
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.preload({
      id,
      ...updateEventDto,
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return await this.eventRepository.save(event);
  }

  // Delete an event by ID
  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
