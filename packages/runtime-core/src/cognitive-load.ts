import type { CognitiveLoadWeights } from './types'
import type { SessionMetrics } from '@linguaflow/telemetry'

export function normalizePauseFrequency(metrics: SessionMetrics): number {
  return Math.min(metrics.pauseFrequency / 3, 1)
}

export function normalizeReplayFrequency(metrics: SessionMetrics): number {
  return Math.min(metrics.replayFrequency / 2, 1)
}

export function computeSubtitleDependency(metrics: SessionMetrics): number {
  return metrics.subtitleOnRatio
}

export function computeSpeedReductionScore(metrics: SessionMetrics): number {
  if (metrics.playbackSpeed >= 1.0) return 0
  return Math.min((1 - metrics.playbackSpeed) * 2, 1)
}

export function normalizeSkipFrequency(metrics: SessionMetrics): number {
  return Math.min(metrics.skipFrequency / 5, 1)
}

export function computeAbandonmentProximity(metrics: SessionMetrics): number {
  if (metrics.abandonmentPoint === null) return 0
  return 1 - (metrics.completionRate ?? 0)
}

export function computeCognitiveLoad(
  metrics: SessionMetrics,
  weights: CognitiveLoadWeights,
): number {
  const components = {
    pauseFrequency: normalizePauseFrequency(metrics),
    replayFrequency: normalizeReplayFrequency(metrics),
    subtitleDependency: computeSubtitleDependency(metrics),
    speedReduction: computeSpeedReductionScore(metrics),
    skipFrequency: normalizeSkipFrequency(metrics),
    abandonmentProximity: computeAbandonmentProximity(metrics),
  }

  const load =
    weights.pauseFrequency * components.pauseFrequency +
    weights.replayFrequency * components.replayFrequency +
    weights.subtitleDependency * components.subtitleDependency +
    weights.speedReduction * components.speedReduction +
    weights.skipFrequency * components.skipFrequency +
    weights.abandonmentProximity * components.abandonmentProximity

  return Math.max(0, Math.min(1, load))
}
