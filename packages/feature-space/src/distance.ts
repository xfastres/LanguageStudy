import type {
  ContentFeatureVector,
  UserProfileVector,
  FeatureWeights,
} from './types'
import { DEFAULT_FEATURE_WEIGHTS } from './config'

export function computeDistance(
  profile: UserProfileVector,
  content: ContentFeatureVector,
  weights: FeatureWeights = DEFAULT_FEATURE_WEIGHTS,
): number {
  const diffs = {
    speechSpeed: Math.abs(profile.speedTolerance - content.speechSpeed),
    lexicalNovelty: Math.abs(profile.vocabularyBreadth - (1 - content.lexicalNovelty)),
    grammarDensity: Math.abs(profile.grammarFamiliarity - (1 - content.grammarDensity)),
    subtitleDependency: Math.abs(profile.subtitleReliance - content.subtitleDependency),
    visualContextStrength: Math.abs(
      profile.contextInference - content.visualContextStrength,
    ),
    emotionalIntensity: Math.abs(
      profile.emotionalReceptivity - content.emotionalIntensity,
    ),
    narrativeDependency: Math.abs(
      profile.narrativeFollowing - content.narrativeDependency,
    ),
    sceneComplexity: Math.abs(
      profile.sceneProcessing - content.sceneComplexity,
    ),
    accentDistance: Math.abs(
      profile.accentAdaptability - (1 - content.accentDistance),
    ),
    abstractionLevel: Math.abs(
      profile.abstractionCapacity - content.abstractionLevel,
    ),
  }

  let totalDistance = 0
  for (const key of Object.keys(weights) as (keyof FeatureWeights)[]) {
    totalDistance += weights[key] * diffs[key]
  }

  return totalDistance
}
