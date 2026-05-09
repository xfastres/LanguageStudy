import type {
  ContentFeatureVector,
  UserProfileVector,
} from './types'

export interface AdaptationAdjustment {
  dimension: keyof ContentFeatureVector
  direction: 'increase' | 'decrease' | 'maintain'
  magnitude: number
}

export function computeAdaptation(
  profile: UserProfileVector,
  currentContent: ContentFeatureVector,
  comprehension: number,
): AdaptationAdjustment[] {
  const adjustments: AdaptationAdjustment[] = []

  if (comprehension < 0.8) {
    adjustments.push({
      dimension: 'speechSpeed',
      direction: 'decrease',
      magnitude: 0.1,
    })
    adjustments.push({
      dimension: 'lexicalNovelty',
      direction: 'decrease',
      magnitude: 0.15,
    })
    adjustments.push({
      dimension: 'grammarDensity',
      direction: 'decrease',
      magnitude: 0.1,
    })
    adjustments.push({
      dimension: 'visualContextStrength',
      direction: 'increase',
      magnitude: 0.15,
    })
    adjustments.push({
      dimension: 'emotionalIntensity',
      direction: 'increase',
      magnitude: 0.1,
    })
  } else if (comprehension > 0.9) {
    adjustments.push({
      dimension: 'speechSpeed',
      direction: 'increase',
      magnitude: 0.05,
    })
    adjustments.push({
      dimension: 'lexicalNovelty',
      direction: 'increase',
      magnitude: 0.1,
    })
    adjustments.push({
      dimension: 'visualContextStrength',
      direction: 'decrease',
      magnitude: 0.05,
    })
    adjustments.push({
      dimension: 'subtitleDependency',
      direction: 'decrease',
      magnitude: 0.1,
    })
  } else {
    adjustments.push({
      dimension: 'speechSpeed',
      direction: 'maintain',
      magnitude: 0,
    })
  }

  return adjustments
}

export function applyCompensationInteractions(
  adjustments: AdaptationAdjustment[],
): AdaptationAdjustment[] {
  const compensations: [keyof ContentFeatureVector, keyof ContentFeatureVector][] = [
    ['visualContextStrength', 'lexicalNovelty'],
    ['emotionalIntensity', 'abstractionLevel'],
    ['narrativeDependency', 'sceneComplexity'],
  ]

  const adjustmentMap = new Map(
    adjustments.map((a) => [a.dimension, a]),
  )

  for (const [compensator, compensated] of compensations) {
    const compensatorAdj = adjustmentMap.get(compensator)
    const compensatedAdj = adjustmentMap.get(compensated)

    if (compensatorAdj && compensatorAdj.direction === 'increase' && !compensatedAdj) {
      adjustmentMap.set(compensated, {
        dimension: compensated,
        direction: 'increase',
        magnitude: compensatorAdj.magnitude * 0.5,
      })
    }
  }

  return Array.from(adjustmentMap.values())
}
