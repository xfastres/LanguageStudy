import { Injectable } from '@nestjs/common'
import type { RuntimeEvent } from '@linguaflow/telemetry'

@Injectable()
export class SignalService {
  private eventStore: Map<string, RuntimeEvent[]> = new Map()

  recordEvent(userId: string, event: RuntimeEvent): void {
    if (!this.eventStore.has(userId)) {
      this.eventStore.set(userId, [])
    }
    this.eventStore.get(userId)!.push(event)
  }

  recordEvents(userId: string, events: RuntimeEvent[]): void {
    if (!this.eventStore.has(userId)) {
      this.eventStore.set(userId, [])
    }
    this.eventStore.get(userId)!.push(...events)
  }

  getEvents(userId: string): RuntimeEvent[] {
    return this.eventStore.get(userId) ?? []
  }
}
