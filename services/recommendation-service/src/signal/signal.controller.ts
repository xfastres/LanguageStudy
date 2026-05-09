import { Controller, Post, Body, Param } from '@nestjs/common'
import { SignalService } from './signal.service'
import { IsString, IsObject, IsArray } from 'class-validator'

class SingleEventDto {
  @IsString()
  userId!: string

  @IsObject()
  event!: Record<string, unknown>
}

class BatchEventsDto {
  @IsString()
  userId!: string

  @IsArray()
  events!: Array<Record<string, unknown>>
}

@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post('event')
  async recordEvent(@Body() dto: SingleEventDto) {
    this.signalService.recordEvent(dto.userId, dto.event as any)
    return { ok: true }
  }

  @Post('events/batch')
  async recordEvents(@Body() dto: BatchEventsDto) {
    this.signalService.recordEvents(dto.userId, dto.events as any[])
    return { ok: true }
  }
}
