import type { FeatureWeights, IPlusOneZone, DimensionInteraction } from './types'

export const DEFAULT_FEATURE_WEIGHTS: FeatureWeights = {
  speechSpeed: 0.12,
  lexicalNovelty: 0.15,
  grammarDensity: 0.10,
  subtitleDependency: 0.08,
  visualContextStrength: 0.12,
  emotionalIntensity: 0.10,
  narrativeDependency: 0.08,
  sceneComplexity: 0.08,
  accentDistance: 0.07,
  abstractionLevel: 0.10,
}

export const DEFAULT_IPLUS1_ZONE: IPlusOneZone = {
  minComprehension: 0.8,
  maxComprehension: 0.9,
  maxCognitiveLoad: 0.6,
  minNovelty: 0.1,
  maxNovelty: 0.2,
}

export const DIMENSION_INTERACTIONS: DimensionInteraction = {
  compensating: [
    ['visualContextStrength', 'lexicalNovelty'],
    ['emotionalIntensity', 'abstractionLevel'],
    ['narrativeDependency', 'sceneComplexity'],
  ],
  reinforcing: [
    ['subtitleDependency', 'speechSpeed'],
    ['accentDistance', 'abstractionLevel'],
  ],
}
