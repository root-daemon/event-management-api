import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    title: 'Name',
    example: 'Event Name',
    description: 'The name of the event',
    required: false,
  })
  name?: string;

  @ApiProperty({
    title: 'Location',
    example: 'Chennai, TN',
    description: 'The location of the event',
    required: false,
  })
  location?: string;

  @ApiProperty({
    title: 'Time',
    example: '2024-09-24T06:59:11.668Z',
    description: 'The time of the event',
    required: false,
  })
  time?: Date;

  @ApiProperty({
    title: 'Description',
    example: 'Description of the event',
    description: 'The Description of the event',
    required: false,
  })
  description?: string;
}
