import { describe, it, expect } from 'vitest'
import { RuntimeMetricsComputer } from '../runtime-metrics'
import type { SessionTrace } from '../types'

describe('RuntimeMetricsComputer', () => {
  it('returns empty report for no traces', () => {
    const computer = new RuntimeMetricsComputer()
    const report = computer.computeReport([])
    expect(report.sampleCount).toBe(0)
    expect(report.immersionCollapseRate).toBe(0)
  })

  it('computes replay density', () => {
    const computer = new RuntimeMetricsComputer()
    const trace: SessionTrace = {
      id: 't1',
      userId: 'user_1',
      events: [
        { type: 'SessionStarted', timestamp: 1000, sessionId: 's1' },
        { type: 'Replay', timestamp: 2000, sessionId: 's1', contentId: 'c1', from: 10, to: 20 },
        { type: 'Replay', timestamp: 3000, sessionId: 's1', contentId: 'c1', from: 15, to: 25 },
        { type: 'SessionEnded', timestamp: 61000, sessionId: 's1', duration: 60000 },
      ],
      startTime: 1000,
      endTime: 61000,
      duration: 60000,
    }
    const report = computer.computeReport([trace])
    expect(report.replayDensity).toBeGreaterThan(0)
  })

  it('computes subtitle dependency', () => {
    const computer = new RuntimeMetricsComputer()
    const trace: SessionTrace = {
      id: 't1',
      userId: 'user_1',
      events: [
        { type: 'SessionStarted', timestamp: 1000, sessionId: 's1' },
        { type: 'SubtitleToggle', timestamp: 2000, sessionId: 's1', contentId: 'c1', enabled: true },
        { type: 'SubtitleToggle', timestamp: 3000, sessionId: 's1', contentId: 'c1', enabled: false },
        { type: 'SubtitleToggle', timestamp: 4000, sessionId: 's1', contentId: 'c1', enabled: true },
        { type: 'SessionEnded', timestamp: 5000, sessionId: 's1', duration: 4000 },
      ],
      startTime: 1000,
      endTime: 5000,
      duration: 4000,
    }
    const report = computer.computeReport([trace])
    expect(report.subtitleDependency).toBeCloseTo(2 / 3, 1)
  })
})
