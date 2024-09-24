import { ApiProperty } from '@nestjs/swagger';

// src/events/dto/create-event.dto.ts
export class CreateEventDto {
  @ApiProperty({
    title: 'Name',
    example: 'Event Name',
    description: 'The name of the event',
  })
  name: string;
  @ApiProperty({
    title: 'Location',
    example: 'Chennai, TN',
    description: 'The location of the event',
  })
  location: string;
  @ApiProperty({
    title: 'Time',
    example: '2024-09-24T06:59:11.668Z',
    description: 'The time of the event',
  })
  time: Date;
  @ApiProperty({
    title: 'Description',
    example: 'Description of the event',
    description: 'The Description of the event',
  })
  description: string;
}
