import type { FlowStateThresholds, InterruptionThresholds } from './types'
import type { SessionMetrics } from '@linguaflow/telemetry'

export function estimateFlowStateProbability(
  immersionScore: number,
  cognitiveLoad: number,
  metrics: SessionMetrics,
  thresholds: FlowStateThresholds,
): number {
  const signals = {
    highImmersion: immersionScore > thresholds.highImmersion,
    lowLoad: cognitiveLoad < thresholds.lowLoad,
    stablePace: metrics.pauseFrequency < thresholds.stablePace,
    longSession: metrics.continuousInputDuration > 600,
  }

  const matchCount = Object.values(signals).filter(Boolean).length
  return matchCount / 4
}

export function computeInterruptionBudget(
  immersionScore: number,
  flowProbability: number,
  thresholds: InterruptionThresholds,
): number {
  if (flowProbability > thresholds.flowBlock) return 0
  if (immersionScore > thresholds.deepImmersionBlock) return 0.2
  if (immersionScore > thresholds.moderateImmersionLimit) return 0.5
  return 1.0
}

export function canInterrupt(
  interruptionBudget: number,
  flowProbability: number,
  thresholds: InterruptionThresholds,
): boolean {
  return (
    interruptionBudget > 0.3 &&
    flowProbability < thresholds.flowBlock
  )
}
