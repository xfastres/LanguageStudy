import type { ComprehensionWeights } from './types'

export const DEFAULT_COMPREHENSION_WEIGHTS: ComprehensionWeights = {
  completionRate: 0.20,
  pauseFrequency: 0.15,
  replayFrequency: 0.15,
  subtitleDependency: 0.10,
  speedPreference: 0.05,
  abandonment: 0.20,
}

export const CALIBRATION_TOLERANCE = 0.15
export const CALIBRATION_TARGET_ACCURACY = 0.85
export const MIN_CALIBRATION_SAMPLES = 30
