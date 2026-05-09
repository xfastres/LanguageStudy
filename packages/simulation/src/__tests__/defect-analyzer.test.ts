import { describe, it, expect } from 'vitest'
import { DefectAnalyzer } from '../defect-analyzer'
import type { SimulationResult, RuntimeDefect } from '../types'

function createResult(
  userId: string,
  defects: RuntimeDefect[] = [],
): SimulationResult {
  return {
    userId,
    contentId: 'content_1',
    steps: [],
    finalState: {
      immersionScore: 0.5,
      cognitiveLoad: 0.3,
      comprehensionEstimate: 0.7,
      actualComprehension: 0.7,
      sessionDuration: 300,
    },
    defects,
  }
}

describe('DefectAnalyzer', () => {
  it('summarizes defects across results', () => {
    const analyzer = new DefectAnalyzer()
    const results = [
      createResult('user_1', [
        { type: 'oscillation', severity: 'high', description: 'test', timestamp: 1000, details: {} },
        { type: 'comprehension_drift', severity: 'medium', description: 'test', timestamp: 2000, details: {} },
      ]),
      createResult('user_2', [
        { type: 'oscillation', severity: 'low', description: 'test', timestamp: 3000, details: {} },
      ]),
    ]

    const summary = analyzer.summarizeDefects(results)
    expect(summary.totalDefects).toBe(3)
    expect(summary.byType.oscillation).toBe(2)
    expect(summary.bySeverity.high).toBe(1)
    expect(summary.mostCommonDefect).toBe('oscillation')
  })

  it('analyzes cross-profile patterns', () => {
    const analyzer = new DefectAnalyzer()
    const results = new Map<string, SimulationResult>()

    results.set('profile_a', createResult('profile_a', [
      { type: 'oscillation', severity: 'high', description: 'test', timestamp: 1000, details: {} },
      { type: 'comprehension_drift', severity: 'medium', description: 'test', timestamp: 2000, details: {} },
    ]))

    results.set('profile_b', createResult('profile_b', [
      { type: 'oscillation', severity: 'low', description: 'test', timestamp: 3000, details: {} },
      { type: 'immersion_collapse', severity: 'high', description: 'test', timestamp: 4000, details: {} },
    ]))

    const analysis = analyzer.analyzeCrossProfile(results)
    expect(analysis.commonDefects).toContain('oscillation')
    expect(analysis.overallHealth).toBeGreaterThanOrEqual(0)
    expect(analysis.recommendations.length).toBeGreaterThan(0)
  })

  it('handles empty results', () => {
    const analyzer = new DefectAnalyzer()
    const summary = analyzer.summarizeDefects([])
    expect(summary.totalDefects).toBe(0)
    expect(summary.mostCommonDefect).toBeNull()
  })
})
