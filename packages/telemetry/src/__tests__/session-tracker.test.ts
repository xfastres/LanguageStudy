import { describe, it, expect } from 'vitest'
import { TelemetryBus } from '../bus'
import { SessionTracker } from '../session-tracker'

describe('SessionTracker', () => {
  it('starts and ends sessions', () => {
    const bus = new TelemetryBus()
    const tracker = new SessionTracker(bus)

    const sessionId = tracker.startSession('user_1')
    expect(sessionId).toMatch(/^sess_/)

    tracker.endSession()

    const sessionEvents = bus.getEventsByType('SessionStarted')
    const endedEvents = bus.getEventsByType('SessionEnded')
    expect(sessionEvents).toHaveLength(1)
    expect(endedEvents).toHaveLength(1)
  })

  it('computes metrics from events', () => {
    const bus = new TelemetryBus()
    const tracker = new SessionTracker(bus)

    tracker.startSession('user_1')

    bus.emit({
      type: 'Pause',
      timestamp: Date.now() + 1000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    bus.emit({
      type: 'Resume',
      timestamp: Date.now() + 3000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    const metrics = tracker.computeMetrics()
    expect(metrics.pauseIntervals).toHaveLength(1)
    expect(metrics.pauseIntervals[0]).toBeGreaterThan(0)
  })
})
