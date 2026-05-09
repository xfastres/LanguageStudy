import type {
  ComprehensionSignalVector,
  ComprehensionWeights,
  ComprehensionEstimate,
} from './types'
import { DEFAULT_COMPREHENSION_WEIGHTS } from './config'

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function estimateComprehensionV1(
  signals: ComprehensionSignalVector,
  weights: ComprehensionWeights = DEFAULT_COMPREHENSION_WEIGHTS,
): number {
  let score = 0.5

  if (signals.completionRate > 0.9) score += 0.2
  else if (signals.completionRate > 0.7) score += 0.1
  else if (signals.completionRate < 0.3) score -= 0.2

  if (signals.pauseFrequency < 0.3) score += 0.1
  else if (signals.pauseFrequency > 1.5) score -= 0.15

  if (signals.replayFrequency < 0.2) score += 0.05
  else if (signals.replayFrequency > 0.8) score -= 0.15

  if (signals.subtitleOnRatio < 0.3) score += 0.1
  else if (signals.subtitleOnRatio > 0.8) score -= 0.1

  if (signals.playbackSpeed > 1.2) score += 0.05
  else if (signals.playbackSpeed < 0.8) score -= 0.1

  if (signals.abandonmentPoint !== null) score -= 0.2

  return clamp(score, 0, 1)
}

export function computeSignalConfidence(
  signals: ComprehensionSignalVector,
): number {
  let confidence = 0.5

  if (signals.completionRate > 0 || signals.abandonmentPoint !== null) {
    confidence += 0.2
  }

  if (signals.pauseFrequency > 0 || signals.replayFrequency > 0) {
    confidence += 0.15
  }

  if (signals.subtitleOnRatio > 0) {
    confidence += 0.1
  }

  if (signals.transitionLatency > 0) {
    confidence += 0.05
  }

  return clamp(confidence, 0, 1)
}

export function createEstimate(
  signals: ComprehensionSignalVector,
  weights: ComprehensionWeights = DEFAULT_COMPREHENSION_WEIGHTS,
): ComprehensionEstimate {
  return {
    value: estimateComprehensionV1(signals, weights),
    confidence: computeSignalConfidence(signals),
    method: 'heuristic_v1',
    signals,
    timestamp: Date.now(),
  }
}
