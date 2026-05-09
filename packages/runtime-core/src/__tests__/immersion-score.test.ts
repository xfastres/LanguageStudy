import { describe, it, expect } from 'vitest'
import { computeImmersionScore, computeSessionContinuity } from '../immersion-score'
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

describe('computeSessionContinuity', () => {
  it('returns 0 for zero duration', () => {
    expect(computeSessionContinuity(createMetrics())).toBeCloseTo(0, 1)
  })

  it('approaches 1 for long duration', () => {
    const result = computeSessionContinuity(createMetrics({ continuousInputDuration: 3600 }))
    expect(result).toBeGreaterThan(0.9)
  })
})

describe('computeImmersionScore', () => {
  it('returns low score for struggling user', () => {
    const metrics = createMetrics({
      continuousInputDuration: 60,
      pauseFrequency: 2.5,
      replayFrequency: 1.5,
      subtitleOnRatio: 0.9,
      completionRate: 0.3,
      recentCompletionRate: 0.3,
      abandonmentPoint: 120,
    })
    const score = computeImmersionScore(metrics, DEFAULT_RUNTIME_CONFIG.immersionScoreWeights)
    expect(score).toBeLessThan(0.5)
  })

  it('returns high score for immersed user', () => {
    const metrics = createMetrics({
      continuousInputDuration: 2700,
      pauseFrequency: 0.1,
      replayFrequency: 0.05,
      confirmationReplays: 2,
      struggleReplays: 0,
      subtitleOnRatio: 0.1,
      completionRate: 0.95,
      recentCompletionRate: 0.95,
      lastTransitionLatency: 5000,
    })
    const score = computeImmersionScore(metrics, DEFAULT_RUNTIME_CONFIG.immersionScoreWeights)
    expect(score).toBeGreaterThan(0.6)
  })

  it('score is always between 0 and 1', () => {
    const extremes = createMetrics({
      continuousInputDuration: 100000,
      pauseFrequency: 100,
      replayFrequency: 100,
      subtitleOnRatio: 1,
      completionRate: 0,
      recentCompletionRate: 0,
    })
    const score = computeImmersionScore(extremes, DEFAULT_RUNTIME_CONFIG.immersionScoreWeights)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(1)
  })
})
