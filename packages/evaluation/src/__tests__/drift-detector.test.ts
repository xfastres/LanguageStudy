import { describe, it, expect } from 'vitest'
import { DriftDetector } from '../drift-detector'
import type { GroundTruthSample } from '../types'

function createSample(overrides: Partial<GroundTruthSample> = {}): GroundTruthSample {
  return {
    traceId: 'trace_1',
    userId: 'user_1',
    timestamp: Date.now(),
    predictedComprehension: 0.8,
    selfReportedComprehension: 0.8,
    predictedImmersion: 0.7,
    selfReportedImmersion: 0.7,
    contentId: 'content_1',
    ...overrides,
  }
}

describe('DriftDetector', () => {
  it('detects no drift with accurate predictions', () => {
    const detector = new DriftDetector()
    for (let i = 0; i < 100; i++) {
      detector.addSample(
        createSample({
          timestamp: Date.now() + i * 1000,
          predictedComprehension: 0.8,
          selfReportedComprehension: 0.8 + (Math.random() - 0.5) * 0.05,
          predictedImmersion: 0.7,
          selfReportedImmersion: 0.7 + (Math.random() - 0.5) * 0.05,
        }),
      )
    }
    const result = detector.detectDrift()
    expect(result.hasDrifted).toBe(false)
    expect(result.driftDirection).toBe('stable')
  })

  it('detects overestimation drift', () => {
    const detector = new DriftDetector()

    for (let i = 0; i < 50; i++) {
      detector.addSample(
        createSample({
          timestamp: Date.now() + i * 1000,
          predictedComprehension: 0.8,
          selfReportedComprehension: 0.8,
          predictedImmersion: 0.7,
          selfReportedImmersion: 0.7,
        }),
      )
    }

    for (let i = 0; i < 50; i++) {
      detector.addSample(
        createSample({
          timestamp: Date.now() + (50 + i) * 1000,
          predictedComprehension: 0.8,
          selfReportedComprehension: 0.5,
          predictedImmersion: 0.7,
          selfReportedImmersion: 0.4,
        }),
      )
    }

    const result = detector.detectDrift()
    expect(result.hasDrifted).toBe(true)
    expect(result.driftDirection).toBe('overestimate')
  })

  it('returns no drift with insufficient samples', () => {
    const detector = new DriftDetector()
    detector.addSample(createSample())
    const result = detector.detectDrift()
    expect(result.hasDrifted).toBe(false)
    expect(result.confidence).toBe(0)
  })
})
