import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DatabaseService } from '../config/database.service';

@Injectable()
export class EventsService {
  private insertEvent;
  private findAllEventsQuery;
  private findEventByIdQuery;
  private updateEventQuery;
  private deleteEventQuery;

  constructor(private dbService: DatabaseService) {
    // Prepare statements for better performance
    this.insertEvent = this.dbService.db.prepare(`
      INSERT INTO events (name, location, time, description)
      VALUES ($name, $location, $time, $description)
    `);

    this.findAllEventsQuery = this.dbService.db.prepare(`
      SELECT * FROM events
    `);

    this.findEventByIdQuery = this.dbService.db.prepare(`
      SELECT * FROM events WHERE id = $id
    `);

    this.updateEventQuery = this.dbService.db.prepare(`
      UPDATE events
      SET name = $name, location = $location, time = $time, description = $description
      WHERE id = $id
    `);

    this.deleteEventQuery = this.dbService.db.prepare(`
      DELETE FROM events WHERE id = $id
    `);
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const result = this.insertEvent.run({
      $name: createEventDto.name,
      $location: createEventDto.location,
      $time: createEventDto.time.toISOString(),
      $description: createEventDto.description,
    });

    return this.findOne(Number(result.lastInsertRowid));
  }

  async findAll(): Promise<Event[]> {
    const rows = this.findAllEventsQuery.all() as any[];
    return rows.map((row) => this.mapRowToEvent(row));
  }

  async findOne(id: number): Promise<Event> {
    const row = this.findEventByIdQuery.get({ $id: id }) as any;
    if (!row) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return this.mapRowToEvent(row);
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.findOne(id);

    const updatedEvent = {
      ...existingEvent,
      ...updateEventDto,
    };

    this.updateEventQuery.run({
      $id: id,
      $name: updatedEvent.name,
      $location: updatedEvent.location,
      $time: updatedEvent.time.toISOString(),
      $description: updatedEvent.description,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingEvent = await this.findOne(id);
    this.deleteEventQuery.run({ $id: id });
  }

  private mapRowToEvent(row: any): Event {
    const event = new Event();
    event.id = row.id;
    event.name = row.name;
    event.location = row.location;
    event.time = new Date(row.time);
    event.description = row.description;
    return event;
  }
}
