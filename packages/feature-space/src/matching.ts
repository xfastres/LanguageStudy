import type {
  ContentFeatureVector,
  UserProfileVector,
  IPlusOneZone,
  ContentCandidate,
  FeatureWeights,
} from './types'
import { DEFAULT_FEATURE_WEIGHTS, DEFAULT_IPLUS1_ZONE } from './config'
import { computeDistance } from './distance'

export function isInIPlusOneZone(
  comprehension: number,
  cognitiveLoad: number,
  novelty: number,
  zone: IPlusOneZone = DEFAULT_IPLUS1_ZONE,
): boolean {
  return (
    comprehension >= zone.minComprehension &&
    comprehension <= zone.maxComprehension &&
    cognitiveLoad <= zone.maxCognitiveLoad &&
    novelty >= zone.minNovelty &&
    novelty <= zone.maxNovelty
  )
}

export function estimateComprehensionFromFeatures(
  profile: UserProfileVector,
  content: ContentFeatureVector,
): number {
  const speedMatch = 1 - Math.abs(profile.speedTolerance - content.speechSpeed)
  const vocabMatch = profile.vocabularyBreadth >= content.lexicalNovelty
    ? 1
    : 1 - (content.lexicalNovelty - profile.vocabularyBreadth)
  const grammarMatch = profile.grammarFamiliarity >= content.grammarDensity
    ? 1
    : 1 - (content.grammarDensity - profile.grammarFamiliarity)
  const contextBoost = content.visualContextStrength * 0.2
  const emotionalBoost = content.emotionalIntensity * 0.1

  const raw =
    0.3 * speedMatch +
    0.25 * vocabMatch +
    0.2 * grammarMatch +
    contextBoost +
    emotionalBoost

  return Math.max(0, Math.min(1, raw))
}

export function rankCandidates(
  profile: UserProfileVector,
  candidates: Array<{ id: string; features: ContentFeatureVector }>,
  weights: FeatureWeights = DEFAULT_FEATURE_WEIGHTS,
  zone: IPlusOneZone = DEFAULT_IPLUS1_ZONE,
): ContentCandidate[] {
  const scored: ContentCandidate[] = candidates.map((c) => {
    const distance = computeDistance(profile, c.features, weights)
    const comprehension = estimateComprehensionFromFeatures(
      profile,
      c.features,
    )
    const novelty = c.features.lexicalNovelty
    const cognitiveLoad = estimateCognitiveLoad(c.features)

    const inZone = isInIPlusOneZone(comprehension, cognitiveLoad, novelty, zone)
    const iPlusOneScore = inZone
      ? 1 - distance
      : Math.max(0, 0.5 - distance)

    return {
      id: c.id,
      features: c.features,
      iPlusOneScore,
      distance,
    }
  })

  return scored.sort((a, b) => b.iPlusOneScore - a.iPlusOneScore)
}

export function recommendNext(
  profile: UserProfileVector,
  candidates: Array<{ id: string; features: ContentFeatureVector }>,
  weights: FeatureWeights = DEFAULT_FEATURE_WEIGHTS,
  zone: IPlusOneZone = DEFAULT_IPLUS1_ZONE,
): ContentCandidate | null {
  const ranked = rankCandidates(profile, candidates, weights, zone)
  return ranked.length > 0 ? ranked[0] : null
}

function estimateCognitiveLoad(features: ContentFeatureVector): number {
  return (
    0.2 * features.speechSpeed +
    0.2 * features.lexicalNovelty +
    0.15 * features.grammarDensity +
    0.15 * features.sceneComplexity +
    0.1 * features.accentDistance +
    0.1 * features.abstractionLevel +
    0.1 * features.narrativeDependency
  )
}
