import type {
  ImmersionRuntime,
  ImmersionState,
  PendingTransition,
  TransitionDecision,
  RuntimeConfig,
} from './types'
import { DEFAULT_RUNTIME_CONFIG } from './config'
import { computeImmersionScore } from './immersion-score'
import { computeCognitiveLoad } from './cognitive-load'
import {
  estimateFlowStateProbability,
  computeInterruptionBudget,
  canInterrupt as checkCanInterrupt,
} from './flow-detector'
import { decideTransition, estimateSwitchingCost } from './switching-cost'
import type { SessionMetrics } from '@linguaflow/telemetry'

export interface MetricsProvider {
  onMetricsUpdate(callback: (metrics: SessionMetrics) => void): void
}

export class ImmersionRuntimeImpl implements ImmersionRuntime {
  private config: RuntimeConfig
  private metrics: SessionMetrics
  private pendingTransitions: PendingTransition[] = []

  constructor(
    private metricsProvider: MetricsProvider,
    config?: Partial<RuntimeConfig>,
  ) {
    this.config = { ...DEFAULT_RUNTIME_CONFIG, ...config }
    this.metrics = this.createEmptyMetrics()
    this.metricsProvider.onMetricsUpdate((metrics) => {
      this.metrics = metrics
    })
  }

  get immersionScore(): number {
    return computeImmersionScore(
      this.metrics,
      this.config.immersionScoreWeights,
    )
  }

  get cognitiveLoad(): number {
    return computeCognitiveLoad(
      this.metrics,
      this.config.cognitiveLoadWeights,
    )
  }

  get interruptionBudget(): number {
    return computeInterruptionBudget(
      this.immersionScore,
      this.flowStateProbability,
      this.config.interruptionThresholds,
    )
  }

  get flowStateProbability(): number {
    return estimateFlowStateProbability(
      this.immersionScore,
      this.cognitiveLoad,
      this.metrics,
      this.config.flowStateThresholds,
    )
  }

  canInterrupt(): boolean {
    return checkCanInterrupt(
      this.interruptionBudget,
      this.flowStateProbability,
      this.config.interruptionThresholds,
    )
  }

  scheduleTransition(transition: PendingTransition): void {
    const decision = this.decideTransitionInternal(transition)
    if (decision.execute) {
      setTimeout(() => {
        this.pendingTransitions =
          this.pendingTransitions.filter((t) => t !== transition)
      }, decision.delay)
    }
    this.pendingTransitions.push(transition)
  }

  estimateSwitchingCost(transition: PendingTransition): number {
    return estimateSwitchingCost(this.metrics, transition)
  }

  getState(): ImmersionState {
    return {
      immersionScore: this.immersionScore,
      cognitiveLoad: this.cognitiveLoad,
      interruptionBudget: this.interruptionBudget,
      flowStateProbability: this.flowStateProbability,
      timestamp: Date.now(),
    }
  }

  private decideTransitionInternal(
    transition: PendingTransition,
  ): TransitionDecision {
    return decideTransition(
      this.metrics,
      transition,
      this.immersionScore,
      this.flowStateProbability,
    )
  }

  private createEmptyMetrics(): SessionMetrics {
    return {
      continuousInputDuration: 0,
      pauseIntervals: [],
      pauseFrequency: 0,
      replayFrequency: 0,
      confirmationReplays: 0,
      struggleReplays: 0,
      subtitleToggleCount: 0,
      subtitleOnRatio: 0,
      playbackSpeed: 1,
      completionRate: 0,
      recentCompletionRate: 0,
      skipFrequency: 0,
      abandonmentPoint: null,
      lastTransitionLatency: 0,
      topicContinuity: true,
      narrativeContinuity: true,
      difficultyJump: 0,
      emotionalShift: 0,
    }
  }
}
