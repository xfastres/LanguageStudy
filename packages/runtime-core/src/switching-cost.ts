import type { PendingTransition, TransitionDecision } from './types'
import type { SessionMetrics } from '@linguaflow/telemetry'

export function estimateSwitchingCost(
  metrics: SessionMetrics,
  transition: PendingTransition,
): number {
  const topicDist = metrics.topicContinuity ? 0 : 0.3
  const difficultyJump = metrics.difficultyJump ?? 0
  const emotionalShift = metrics.emotionalShift ?? 0
  const narrativeBreak = metrics.narrativeContinuity ? 0 : 0.25

  const weights = {
    content: { topic: 0.3, difficulty: 0.3, emotional: 0.2, narrative: 0.2 },
    mode: { topic: 0.1, difficulty: 0.1, emotional: 0.3, narrative: 0.5 },
    ui: { topic: 0.1, difficulty: 0.1, emotional: 0.5, narrative: 0.3 },
    notification: { topic: 0.2, difficulty: 0.1, emotional: 0.4, narrative: 0.3 },
  }

  const w = weights[transition.type]
  const cost =
    w.topic * topicDist +
    w.difficulty * difficultyJump +
    w.emotional * emotionalShift +
    w.narrative * narrativeBreak

  return Math.max(0, Math.min(1, cost))
}

export function decideTransition(
  metrics: SessionMetrics,
  transition: PendingTransition,
  immersionScore: number,
  flowProbability: number,
): TransitionDecision {
  const cost = estimateSwitchingCost(metrics, transition)
  const HIGH_COST_THRESHOLD = 0.5

  if (flowProbability > 0.8) {
    return {
      execute: false,
      delay: 60000,
      reason: 'flow_state_active',
      estimatedCost: cost,
    }
  }

  if (cost > HIGH_COST_THRESHOLD && immersionScore > 0.6) {
    return {
      execute: false,
      delay: 30000,
      reason: 'high_switching_cost_during_immersion',
      estimatedCost: cost,
    }
  }

  if (cost > 0.3 && immersionScore > 0.4) {
    return {
      execute: true,
      delay: 5000,
      reason: 'moderate_cost_deferred',
      estimatedCost: cost,
    }
  }

  return {
    execute: true,
    delay: 0,
    reason: 'low_cost_immediate',
    estimatedCost: cost,
  }
}
