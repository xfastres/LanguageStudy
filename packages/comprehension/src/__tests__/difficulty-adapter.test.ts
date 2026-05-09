import { describe, it, expect } from 'vitest'
import { computeDifficultyAdjustment } from '../difficulty-adapter'
import { createEstimate } from '../heuristic-v1'
import type { ComprehensionSignalVector } from '../types'

function createSignals(overrides: Partial<ComprehensionSignalVector> = {}): ComprehensionSignalVector {
  return {
    pauseFrequency: 0.5,
    replayFrequency: 0.2,
    subtitleToggleCount: 2,
    subtitleOnRatio: 0.5,
    playbackSpeed: 1.0,
    completionRate: 0.8,
    skipSegments: [],
    dwellTimePerSegment: 30,
    abandonmentPoint: null,
    transitionLatency: 2000,
    ...overrides,
  }
}

describe('computeDifficultyAdjustment', () => {
  it('decreases difficulty for low comprehension', () => {
    const signals = createSignals({
      pauseFrequency: 2.0,
      replayFrequency: 1.0,
      subtitleOnRatio: 0.9,
      playbackSpeed: 0.7,
      completionRate: 0.2,
      abandonmentPoint: 120,
    })
    const estimate = createEstimate(signals)
    const adjustment = computeDifficultyAdjustment(estimate)
    expect(adjustment.direction).toBe('decrease')
  })

  it('increases difficulty for very high comprehension', () => {
    const signals = createSignals({
      pauseFrequency: 0.05,
      replayFrequency: 0.02,
      subtitleOnRatio: 0.05,
      playbackSpeed: 1.5,
      completionRate: 0.99,
    })
    const estimate = createEstimate(signals)
    const adjustment = computeDifficultyAdjustment(estimate)
    expect(adjustment.direction).toBe('increase')
  })

  it('maintains difficulty in i+1 zone', () => {
    const signals = createSignals({
      pauseFrequency: 0.2,
      replayFrequency: 0.1,
      subtitleOnRatio: 0.4,
      playbackSpeed: 1.0,
      completionRate: 0.92,
    })
    const estimate = createEstimate(signals)
    const adjustment = computeDifficultyAdjustment(estimate)
    expect(adjustment.direction).toBe('maintain')
  })
})
