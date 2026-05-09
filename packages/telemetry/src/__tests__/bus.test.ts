import { describe, it, expect } from 'vitest'
import { TelemetryBus } from '../bus'

describe('TelemetryBus', () => {
  it('emits and receives events', () => {
    const bus = new TelemetryBus()
    const received: any[] = []

    bus.on('Pause', (event) => {
      received.push(event)
    })

    bus.emit({
      type: 'Pause',
      timestamp: 1000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    expect(received).toHaveLength(1)
    expect(received[0].type).toBe('Pause')
  })

  it('supports global handlers', () => {
    const bus = new TelemetryBus()
    const received: any[] = []

    bus.onAny((event) => {
      received.push(event)
    })

    bus.emit({
      type: 'Pause',
      timestamp: 1000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    bus.emit({
      type: 'Resume',
      timestamp: 2000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    expect(received).toHaveLength(2)
  })

  it('unsubscribes correctly', () => {
    const bus = new TelemetryBus()
    let count = 0

    const unsub = bus.on('Pause', () => {
      count++
    })

    bus.emit({
      type: 'Pause',
      timestamp: 1000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    unsub()

    bus.emit({
      type: 'Pause',
      timestamp: 2000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 60,
    })

    expect(count).toBe(1)
  })

  it('maintains event log', () => {
    const bus = new TelemetryBus()

    bus.emit({
      type: 'Pause',
      timestamp: 1000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    bus.emit({
      type: 'Resume',
      timestamp: 2000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    expect(bus.getEventLog()).toHaveLength(2)
    expect(bus.getEventsByType('Pause')).toHaveLength(1)
  })

  it('respects max log size', () => {
    const bus = new TelemetryBus(5)

    for (let i = 0; i < 10; i++) {
      bus.emit({
        type: 'Pause',
        timestamp: i * 1000,
        sessionId: 'sess_1',
        contentId: 'content_1',
        position: i * 10,
      })
    }

    expect(bus.getEventLog()).toHaveLength(5)
  })
})
