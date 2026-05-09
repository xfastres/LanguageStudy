import { describe, it, expect } from 'vitest'
import { estimateFlowStateProbability, computeInterruptionBudget, canInterrupt } from '../flow-detector'
import { DEFAULT_RUNTIME_CONFIG } from '../config'
import type { SessionMetrics } from '@linguaflow/telemetry'

function createMetrics(overrides: Partial<SessionMetrics> = {}): SessionMetrics {
  return {
    continuousInputDuration: 0,
    pauseIntervals: [],
    pauseFrequency: 0,
    replayFrequency: 0,
    confirmationReplays: 0,
    struggleReplays: 0,
    subtitleToggleCount: 0,
    subtitleOnRatio: 0,
    playbackSpeed: 1,
    completionRate: 0,
    recentCompletionRate: 0,
    skipFrequency: 0,
    abandonmentPoint: null,
    lastTransitionLatency: 0,
    topicContinuity: true,
    narrativeContinuity: true,
    difficultyJump: 0,
    emotionalShift: 0,
    ...overrides,
  }
}

describe('estimateFlowStateProbability', () => {
  it('returns high probability when all signals match', () => {
    const metrics = createMetrics({
      continuousInputDuration: 1200,
      pauseFrequency: 0.1,
    })
    const prob = estimateFlowStateProbability(
      0.8, 0.2, metrics, DEFAULT_RUNTIME_CONFIG.flowStateThresholds,
    )
    expect(prob).toBeGreaterThanOrEqual(0.75)
  })

  it('returns low probability when no signals match', () => {
    const metrics = createMetrics({
      continuousInputDuration: 60,
      pauseFrequency: 2,
    })
    const prob = estimateFlowStateProbability(
      0.3, 0.7, metrics, DEFAULT_RUNTIME_CONFIG.flowStateThresholds,
    )
    expect(prob).toBeLessThanOrEqual(0.25)
  })
})

describe('computeInterruptionBudget', () => {
  it('returns 0 during flow state', () => {
    const budget = computeInterruptionBudget(0.8, 0.9, DEFAULT_RUNTIME_CONFIG.interruptionThresholds)
    expect(budget).toBe(0)
  })

  it('returns 1 for shallow browsing', () => {
    const budget = computeInterruptionBudget(0.1, 0.1, DEFAULT_RUNTIME_CONFIG.interruptionThresholds)
    expect(budget).toBe(1)
  })
})

describe('canInterrupt', () => {
  it('returns false during flow', () => {
    expect(canInterrupt(0, 0.9, DEFAULT_RUNTIME_CONFIG.interruptionThresholds)).toBe(false)
  })

  it('returns true for shallow state', () => {
    expect(canInterrupt(1, 0.1, DEFAULT_RUNTIME_CONFIG.interruptionThresholds)).toBe(true)
  })
})
