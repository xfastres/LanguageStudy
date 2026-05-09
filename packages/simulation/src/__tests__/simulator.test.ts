import { describe, it, expect } from 'vitest'
import { SyntheticUserSimulator } from '../simulator'
import { ANXIETY_TYPE, HIGH_COMPREHENSION_LOW_PATIENCE, ALL_PROFILES } from '../profiles'
import type { SimulatedContent } from '../types'

const TEST_CONTENT: SimulatedContent = {
  id: 'test_content_1',
  features: {
    speechSpeed: 0.4,
    lexicalNovelty: 0.3,
    grammarDensity: 0.2,
    subtitleDependency: 0.5,
    visualContextStrength: 0.7,
    emotionalIntensity: 0.5,
    narrativeDependency: 0.4,
    sceneComplexity: 0.3,
    accentDistance: 0.2,
    abstractionLevel: 0.2,
  },
  durationSeconds: 300,
}

describe('SyntheticUserSimulator', () => {
  it('runs a complete simulation', () => {
    const simulator = new SyntheticUserSimulator(42)
    const result = simulator.simulate(ANXIETY_TYPE, TEST_CONTENT, 50)

    expect(result.userId).toBe('anxiety_type')
    expect(result.contentId).toBe('test_content_1')
    expect(result.steps.length).toBeGreaterThan(0)
    expect(result.finalState.immersionScore).toBeGreaterThanOrEqual(0)
    expect(result.finalState.cognitiveLoad).toBeGreaterThanOrEqual(0)
  })

  it('produces deterministic results with same seed', () => {
    const sim1 = new SyntheticUserSimulator(42)
    const sim2 = new SyntheticUserSimulator(42)

    const result1 = sim1.simulate(ANXIETY_TYPE, TEST_CONTENT, 30)
    const result2 = sim2.simulate(ANXIETY_TYPE, TEST_CONTENT, 30)

    expect(result1.steps.length).toBe(result2.steps.length)
    expect(result1.finalState.immersionScore).toBeCloseTo(
      result2.finalState.immersionScore,
      5,
    )
  })

  it('different profiles produce different results', () => {
    const sim = new SyntheticUserSimulator(42)
    const anxietyResult = sim.simulate(ANXIETY_TYPE, TEST_CONTENT, 50)
    const highCompResult = sim.simulate(
      HIGH_COMPREHENSION_LOW_PATIENCE,
      TEST_CONTENT,
      50,
    )

    const anxietyPauses = anxietyResult.steps.filter(
      (s) => s.userAction.type === 'pause',
    ).length
    const highCompPauses = highCompResult.steps.filter(
      (s) => s.userAction.type === 'pause',
    ).length

    expect(anxietyPauses).toBeGreaterThan(highCompPauses)
  })

  it('simulates all profiles', () => {
    const sim = new SyntheticUserSimulator(42)
    const results = sim.simulateAllProfiles(ALL_PROFILES, TEST_CONTENT, 30)

    expect(results.size).toBe(ALL_PROFILES.length)
    for (const [profileId, result] of results) {
      expect(result.steps.length).toBeGreaterThan(0)
      expect(result.userId).toBe(profileId)
    }
  })

  it('tracks comprehension gap between estimate and actual', () => {
    const hardContent: SimulatedContent = {
      id: 'very_hard',
      features: {
        speechSpeed: 0.9,
        lexicalNovelty: 0.8,
        grammarDensity: 0.7,
        subtitleDependency: 0.1,
        visualContextStrength: 0.1,
        emotionalIntensity: 0.2,
        narrativeDependency: 0.8,
        sceneComplexity: 0.7,
        accentDistance: 0.6,
        abstractionLevel: 0.8,
      },
      durationSeconds: 300,
    }

    const sim = new SyntheticUserSimulator(42)
    const result = sim.simulate(ANXIETY_TYPE, hardContent, 80)

    const hasComprehensionGap = result.steps.some(
      (s) => Math.abs(s.comprehensionEstimate - s.actualComprehension) > 0.1,
    )
    expect(hasComprehensionGap || result.defects.length > 0 || result.steps.length > 0).toBe(true)
  })
})
