import { describe, it, expect } from 'vitest'
import { estimateComprehensionV1, computeSignalConfidence, createEstimate } from '../heuristic-v1'
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

describe('estimateComprehensionV1', () => {
  it('returns high comprehension for smooth consumption', () => {
    const signals = createSignals({
      pauseFrequency: 0.1,
      replayFrequency: 0.05,
      subtitleOnRatio: 0.1,
      playbackSpeed: 1.3,
      completionRate: 0.95,
      abandonmentPoint: null,
    })
    const comprehension = estimateComprehensionV1(signals)
    expect(comprehension).toBeGreaterThan(0.7)
  })

  it('returns low comprehension for struggling user', () => {
    const signals = createSignals({
      pauseFrequency: 2.0,
      replayFrequency: 1.0,
      subtitleOnRatio: 0.9,
      playbackSpeed: 0.7,
      completionRate: 0.2,
      abandonmentPoint: 120,
    })
    const comprehension = estimateComprehensionV1(signals)
    expect(comprehension).toBeLessThan(0.4)
  })

  it('returns i+1 zone comprehension for moderate signals', () => {
    const signals = createSignals({
      pauseFrequency: 0.5,
      replayFrequency: 0.2,
      subtitleOnRatio: 0.4,
      playbackSpeed: 1.0,
      completionRate: 0.85,
      abandonmentPoint: null,
    })
    const comprehension = estimateComprehensionV1(signals)
    expect(comprehension).toBeGreaterThanOrEqual(0.6)
    expect(comprehension).toBeLessThanOrEqual(0.95)
  })

  it('clamps result between 0 and 1', () => {
    const extremeSignals = createSignals({
      pauseFrequency: 100,
      replayFrequency: 100,
      subtitleOnRatio: 1,
      playbackSpeed: 0.1,
      completionRate: 0,
      abandonmentPoint: 10,
    })
    const comprehension = estimateComprehensionV1(extremeSignals)
    expect(comprehension).toBeGreaterThanOrEqual(0)
    expect(comprehension).toBeLessThanOrEqual(1)
  })
})

describe('computeSignalConfidence', () => {
  it('returns higher confidence with more signals', () => {
    const minimalSignals = createSignals({
      completionRate: 0,
      pauseFrequency: 0,
      subtitleOnRatio: 0,
      transitionLatency: 0,
    })
    const richSignals = createSignals({
      completionRate: 0.9,
      pauseFrequency: 0.5,
      subtitleOnRatio: 0.4,
      transitionLatency: 3000,
    })
    const minimalConfidence = computeSignalConfidence(minimalSignals)
    const richConfidence = computeSignalConfidence(richSignals)
    expect(richConfidence).toBeGreaterThan(minimalConfidence)
  })
})

describe('createEstimate', () => {
  it('creates a complete estimate with metadata', () => {
    const signals = createSignals()
    const estimate = createEstimate(signals)
    expect(estimate.value).toBeGreaterThanOrEqual(0)
    expect(estimate.value).toBeLessThanOrEqual(1)
    expect(estimate.confidence).toBeGreaterThanOrEqual(0)
    expect(estimate.method).toBe('heuristic_v1')
    expect(estimate.signals).toBe(signals)
    expect(estimate.timestamp).toBeGreaterThan(0)
  })
})
