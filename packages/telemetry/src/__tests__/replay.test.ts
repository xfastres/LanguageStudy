import { describe, it, expect } from 'vitest'
import { TelemetryBus } from '../bus'
import { ReplayEngine } from '../replay'

describe('ReplayEngine', () => {
  it('reconstructs session trace', () => {
    const bus = new TelemetryBus()
    const engine = new ReplayEngine(bus)

    bus.emit({
      type: 'SessionStarted',
      timestamp: 1000,
      sessionId: 'sess_1',
    })

    bus.emit({
      type: 'Pause',
      timestamp: 2000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    bus.emit({
      type: 'SessionEnded',
      timestamp: 3000,
      sessionId: 'sess_1',
      duration: 2000,
    })

    const trace = engine.getSessionTrace('sess_1')
    expect(trace).not.toBeNull()
    expect(trace!.events).toHaveLength(3)
    expect(trace!.duration).toBe(2000)
  })

  it('detects immersion collapse from app switch', () => {
    const bus = new TelemetryBus()
    const engine = new ReplayEngine(bus)

    bus.emit({
      type: 'SessionStarted',
      timestamp: 1000,
      sessionId: 'sess_1',
    })

    bus.emit({
      type: 'Pause',
      timestamp: 2000,
      sessionId: 'sess_1',
      contentId: 'content_1',
      position: 30,
    })

    bus.emit({
      type: 'AppBackgrounded',
      timestamp: 3000,
      sessionId: 'sess_1',
    })

    const trace = engine.getSessionTrace('sess_1')!
    const collapses = engine.analyzeImmersionCollapse(trace)
    expect(collapses.length).toBeGreaterThan(0)
    expect(collapses[0].type).toBe('app_switch')
  })

  it('returns null for non-existent session', () => {
    const bus = new TelemetryBus()
    const engine = new ReplayEngine(bus)

    expect(engine.getSessionTrace('nonexistent')).toBeNull()
  })
})
