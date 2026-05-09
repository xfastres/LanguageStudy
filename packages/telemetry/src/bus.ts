import type { RuntimeEvent } from './events'

type EventTypeMap = {
  [E in RuntimeEvent as E['type']]: E
}

export type EventHandler<T extends RuntimeEvent = RuntimeEvent> = (event: T) => void

export class TelemetryBus {
  private handlers: Map<string, EventHandler[]> = new Map()
  private globalHandlers: EventHandler[] = []
  private eventLog: RuntimeEvent[] = []
  private maxLogSize: number

  constructor(maxLogSize: number = 10000) {
    this.maxLogSize = maxLogSize
  }

  emit(event: RuntimeEvent): void {
    this.eventLog.push(event)
    if (this.eventLog.length > this.maxLogSize) {
      this.eventLog.shift()
    }

    const typeHandlers = this.handlers.get(event.type) ?? []
    for (const handler of typeHandlers) {
      handler(event)
    }

    for (const handler of this.globalHandlers) {
      handler(event)
    }
  }

  on<K extends RuntimeEvent['type']>(
    eventType: K,
    handler: EventHandler<EventTypeMap[K]>,
  ): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, [])
    }
    this.handlers.get(eventType)!.push(handler as EventHandler)

    return () => {
      const handlers = this.handlers.get(eventType)
      if (handlers) {
        const idx = handlers.indexOf(handler as EventHandler)
        if (idx !== -1) handlers.splice(idx, 1)
      }
    }
  }

  onAny(handler: EventHandler): () => void {
    this.globalHandlers.push(handler)
    return () => {
      const idx = this.globalHandlers.indexOf(handler)
      if (idx !== -1) this.globalHandlers.splice(idx, 1)
    }
  }

  getEventLog(): RuntimeEvent[] {
    return [...this.eventLog]
  }

  getEventsByType<K extends RuntimeEvent['type']>(
    type: K,
  ): EventTypeMap[K][] {
    return this.eventLog.filter((e) => e.type === type) as EventTypeMap[K][]
  }

  getEventsInRange(start: number, end: number): RuntimeEvent[] {
    return this.eventLog.filter(
      (e) => e.timestamp >= start && e.timestamp <= end,
    )
  }

  clear(): void {
    this.eventLog = []
  }
}
