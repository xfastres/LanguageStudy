import { describe, it, expect } from 'vitest'
import { computeCognitiveLoad } from '../cognitive-load'
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

describe('computeCognitiveLoad', () => {
  it('returns low load for smooth consumption', () => {
    const metrics = createMetrics({
      pauseFrequency: 0.1,
      replayFrequency: 0.05,
      subtitleOnRatio: 0.1,
      playbackSpeed: 1.2,
      skipFrequency: 0,
      completionRate: 0.95,
    })
    const load = computeCognitiveLoad(metrics, DEFAULT_RUNTIME_CONFIG.cognitiveLoadWeights)
    expect(load).toBeLessThan(0.3)
  })

  it('returns high load for struggling user', () => {
    const metrics = createMetrics({
      pauseFrequency: 2.5,
      replayFrequency: 1.5,
      subtitleOnRatio: 0.9,
      playbackSpeed: 0.7,
      skipFrequency: 4,
      abandonmentPoint: 120,
      completionRate: 0.3,
    })
    const load = computeCognitiveLoad(metrics, DEFAULT_RUNTIME_CONFIG.cognitiveLoadWeights)
    expect(load).toBeGreaterThan(0.5)
  })

  it('load is always between 0 and 1', () => {
    const extremes = createMetrics({
      pauseFrequency: 100,
      replayFrequency: 100,
      subtitleOnRatio: 1,
      playbackSpeed: 0.1,
      skipFrequency: 100,
      abandonmentPoint: 10,
      completionRate: 0,
    })
    const load = computeCognitiveLoad(extremes, DEFAULT_RUNTIME_CONFIG.cognitiveLoadWeights)
    expect(load).toBeGreaterThanOrEqual(0)
    expect(load).toBeLessThanOrEqual(1)
  })
})
