import { describe, it, expect } from 'vitest'
import { isInIPlusOneZone, estimateComprehensionFromFeatures, rankCandidates, recommendNext } from '../matching'
import type { ContentFeatureVector, UserProfileVector } from '../types'

describe('isInIPlusOneZone', () => {
  it('returns true for i+1 sweet spot', () => {
    expect(isInIPlusOneZone(0.85, 0.4, 0.15)).toBe(true)
  })

  it('returns false for too easy content', () => {
    expect(isInIPlusOneZone(0.95, 0.2, 0.05)).toBe(false)
  })

  it('returns false for too hard content', () => {
    expect(isInIPlusOneZone(0.5, 0.8, 0.4)).toBe(false)
  })
})

describe('estimateComprehensionFromFeatures', () => {
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

  it('returns high comprehension for easy content', () => {
    const easyContent: ContentFeatureVector = {
      speechSpeed: 0.2,
      lexicalNovelty: 0.1,
      grammarDensity: 0.1,
      subtitleDependency: 0.5,
      visualContextStrength: 0.8,
      emotionalIntensity: 0.6,
      narrativeDependency: 0.3,
      sceneComplexity: 0.2,
      accentDistance: 0.1,
      abstractionLevel: 0.1,
    }
    const comprehension = estimateComprehensionFromFeatures(beginnerProfile, easyContent)
    expect(comprehension).toBeGreaterThan(0.5)
  })

  it('returns low comprehension for hard content', () => {
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
    const comprehension = estimateComprehensionFromFeatures(beginnerProfile, hardContent)
    expect(comprehension).toBeLessThan(0.5)
  })
})

describe('recommendNext', () => {
  const profile: UserProfileVector = {
    speedTolerance: 0.3,
    vocabularyBreadth: 0.3,
    grammarFamiliarity: 0.3,
    subtitleReliance: 0.6,
    contextInference: 0.4,
    emotionalReceptivity: 0.5,
    narrativeFollowing: 0.4,
    sceneProcessing: 0.3,
    accentAdaptability: 0.2,
    abstractionCapacity: 0.2,
  }

  it('recommends best i+1 match', () => {
    const candidates = [
      {
        id: 'too_easy',
        features: {
          speechSpeed: 0.1, lexicalNovelty: 0.05, grammarDensity: 0.05,
          subtitleDependency: 0.9, visualContextStrength: 0.9,
          emotionalIntensity: 0.3, narrativeDependency: 0.1,
          sceneComplexity: 0.1, accentDistance: 0.05, abstractionLevel: 0.05,
        } as ContentFeatureVector,
      },
      {
        id: 'i_plus_1',
        features: {
          speechSpeed: 0.3, lexicalNovelty: 0.15, grammarDensity: 0.15,
          subtitleDependency: 0.4, visualContextStrength: 0.7,
          emotionalIntensity: 0.5, narrativeDependency: 0.3,
          sceneComplexity: 0.25, accentDistance: 0.1, abstractionLevel: 0.15,
        } as ContentFeatureVector,
      },
      {
        id: 'too_hard',
        features: {
          speechSpeed: 0.9, lexicalNovelty: 0.8, grammarDensity: 0.7,
          subtitleDependency: 0.1, visualContextStrength: 0.2,
          emotionalIntensity: 0.3, narrativeDependency: 0.8,
          sceneComplexity: 0.7, accentDistance: 0.6, abstractionLevel: 0.8,
        } as ContentFeatureVector,
      },
    ]

    const recommendation = recommendNext(profile, candidates)
    expect(recommendation).not.toBeNull()
    expect(recommendation!.id).toBe('i_plus_1')
  })

  it('returns null for empty candidates', () => {
    expect(recommendNext(profile, [])).toBeNull()
  })
})
