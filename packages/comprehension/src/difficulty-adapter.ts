import type { ComprehensionEstimate } from './types'

export type DifficultyDirection = 'decrease' | 'maintain' | 'increase'

export interface DifficultyAdjustment {
  direction: DifficultyDirection
  dimensions: DifficultyDimensionAdjustment[]
  reason: string
}

export interface DifficultyDimensionAdjustment {
  dimension: string
  currentValue: number
  suggestedValue: number
  delta: number
}

export function computeDifficultyAdjustment(
  estimate: ComprehensionEstimate,
): DifficultyAdjustment {
  const comprehension = estimate.value

  if (comprehension < 0.6) {
    return {
      direction: 'decrease',
      dimensions: [
        createAdjustment('speechSpeed', 0, -0.15),
        createAdjustment('lexicalNovelty', 0, -0.2),
        createAdjustment('grammarDensity', 0, -0.15),
        createAdjustment('sceneComplexity', 0, -0.1),
        createAdjustment('visualContextStrength', 0, 0.2),
        createAdjustment('subtitleExposure', 0, 0.15),
      ],
      reason: 'comprehension_below_threshold',
    }
  }

  if (comprehension < 0.8) {
    return {
      direction: 'decrease',
      dimensions: [
        createAdjustment('speechSpeed', 0, -0.05),
        createAdjustment('lexicalNovelty', 0, -0.1),
        createAdjustment('visualContextStrength', 0, 0.1),
      ],
      reason: 'comprehension_slightly_low',
    }
  }

  if (comprehension > 0.95) {
    return {
      direction: 'increase',
      dimensions: [
        createAdjustment('speechSpeed', 0, 0.1),
        createAdjustment('lexicalNovelty', 0, 0.15),
        createAdjustment('grammarDensity', 0, 0.1),
        createAdjustment('subtitleExposure', 0, -0.1),
      ],
      reason: 'comprehension_very_high',
    }
  }

  if (comprehension > 0.9) {
    return {
      direction: 'increase',
      dimensions: [
        createAdjustment('speechSpeed', 0, 0.05),
        createAdjustment('lexicalNovelty', 0, 0.05),
        createAdjustment('subtitleExposure', 0, -0.05),
      ],
      reason: 'comprehension_slightly_high',
    }
  }

  return {
    direction: 'maintain',
    dimensions: [],
    reason: 'comprehension_in_i_plus_1_zone',
  }
}

function createAdjustment(
  dimension: string,
  currentValue: number,
  delta: number,
): DifficultyDimensionAdjustment {
  return {
    dimension,
    currentValue,
    suggestedValue: Math.max(0, Math.min(1, currentValue + delta)),
    delta,
  }
}
