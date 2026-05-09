import { describe, it, expect } from 'vitest'
import { computeDistance } from '../distance'
import type { ContentFeatureVector, UserProfileVector } from '../types'

describe('computeDistance', () => {
  const beginnerProfile: UserProfileVector = {
    speedTolerance: 0.2,
    vocabularyBreadth: 0.2,
    grammarFamiliarity: 0.2,
    subtitleReliance: 0.8,
    contextInference: 0.3,
    emotionalReceptivity: 0.5,
    narrativeFollowing: 0.3,
    sceneProcessing: 0.2,
    accentAdaptability: 0.1,
    abstractionCapacity: 0.1,
  }

  const easyContent: ContentFeatureVector = {
    speechSpeed: 0.2,
    lexicalNovelty: 0.15,
    grammarDensity: 0.1,
    subtitleDependency: 0.5,
    visualContextStrength: 0.8,
    emotionalIntensity: 0.6,
    narrativeDependency: 0.3,
    sceneComplexity: 0.2,
    accentDistance: 0.1,
    abstractionLevel: 0.1,
  }

  const hardContent: ContentFeatureVector = {
    speechSpeed: 0.9,
    lexicalNovelty: 0.8,
    grammarDensity: 0.7,
    subtitleDependency: 0.1,
    visualContextStrength: 0.2,
    emotionalIntensity: 0.3,
    narrativeDependency: 0.8,
    sceneComplexity: 0.7,
    accentDistance: 0.6,
    abstractionLevel: 0.8,
  }

  it('returns small distance for well-matched content', () => {
    const distance = computeDistance(beginnerProfile, easyContent)
    expect(distance).toBeLessThan(0.35)
  })

  it('returns large distance for poorly-matched content', () => {
    const distance = computeDistance(beginnerProfile, hardContent)
    expect(distance).toBeGreaterThan(0.3)
  })

  it('distance is always non-negative', () => {
    const distance = computeDistance(beginnerProfile, easyContent)
    expect(distance).toBeGreaterThanOrEqual(0)
  })
})
