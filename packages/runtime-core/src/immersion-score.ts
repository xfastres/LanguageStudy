import type { ImmersionScoreWeights } from './types'
import type { SessionMetrics } from '@linguaflow/telemetry'

export function computeSessionContinuity(
  metrics: SessionMetrics,
  lambda: number = 0.005,
): number {
  return 1 - Math.exp(-lambda * metrics.continuousInputDuration)
}

export function computePauseVariance(
  metrics: SessionMetrics,
): number {
  const intervals = metrics.pauseIntervals
  if (intervals.length < 2) return 0.5
  const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const variance =
    intervals.reduce((sum, x) => sum + (x - mean) ** 2, 0) / intervals.length
  return Math.min(variance / 10000, 1)
}

export function computeReplayPatternScore(
  metrics: SessionMetrics,
): number {
  if (metrics.confirmationReplays === 0 && metrics.struggleReplays === 0) {
    return 0.5
  }
  const total = metrics.confirmationReplays + metrics.struggleReplays
  return metrics.confirmationReplays / total
}

export function computeSubtitleStability(
  metrics: SessionMetrics,
): number {
  if (metrics.subtitleToggleCount <= 1) return 1
  return Math.max(0, 1 - metrics.subtitleToggleCount / 20)
}

export function computeSwitchingLatency(
  metrics: SessionMetrics,
): number {
  return Math.min(metrics.lastTransitionLatency / 10000, 1)
}

export function computeCompletionMomentum(
  metrics: SessionMetrics,
): number {
  return metrics.recentCompletionRate
}

export function computeImmersionScore(
  metrics: SessionMetrics,
  weights: ImmersionScoreWeights,
): number {
  const components = {
    sessionContinuity: computeSessionContinuity(metrics),
    pauseVariance: 1 - computePauseVariance(metrics),
    replayPattern: computeReplayPatternScore(metrics),
    subtitleStability: computeSubtitleStability(metrics),
    switchingLatency: computeSwitchingLatency(metrics),
    completionMomentum: computeCompletionMomentum(metrics),
  }

  const score =
    weights.sessionContinuity * components.sessionContinuity +
    weights.pauseVariance * components.pauseVariance +
    weights.replayPattern * components.replayPattern +
    weights.subtitleStability * components.subtitleStability +
    weights.switchingLatency * components.switchingLatency +
    weights.completionMomentum * components.completionMomentum

  return Math.max(0, Math.min(1, score))
}
